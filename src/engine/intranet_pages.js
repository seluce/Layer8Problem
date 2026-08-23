import { tree } from '../i18n/i18n.svelte.js';
import { state } from './engine_state.svelte.js';

/**
 * The company pages, composed WHILE THEY ARE DRAWN.
 *
 * The split this file exists for: engine_ui.buildIntranet() decides what the
 * pages are about - which colleague won, which four posts are in the feed,
 * which threshold row the loyalty line falls into - and writes that down as
 * indices and keys. Not one sentence of it travels. This function turns those
 * identities into rows, out of the tree that is loaded at the moment of the
 * call.
 *
 * Up to 6.1.1 the deciding step also did the composing, and it ran only when
 * the window opened: a language switch changed the browser frame around the
 * pages and left some three hundred lines of page text standing in the old
 * language. Composing here means the switch is not a special case at all -
 * the pages are simply drawn again, out of the other tree.
 *
 * `tree()` is what makes that work: it reads the language rune on the way
 * past, so a component doing `$derived(intranetPages())` becomes a reader of
 * the language and redraws by itself. The same reason components never
 * import DB - see CLAUDE.md.
 *
 * Returns null while the pool is still loading; every component already
 * guards for that.
 */
export function intranetPages() {
    const src = tree()?.intranet;
    const data = state.intranetData;
    if (!src || !data) return null;

    const row = (list, i) => (Array.isArray(list) && i != null ? list[i] ?? null : null);

    // Employee of the month. The decision is in `kind`; the words are here.
    const employee =
        data.employee?.kind === 'self' ? { ...src.employeeSelf, self: true }
      : data.employee?.kind === 'best' ? { name: data.employee.name, ...src.employee[data.employee.name] }
      : { name: src.employeeNone.title, role: '', reason: src.employeeNone.reason, none: true };

    // Human Capital: the condition was checked when the file was opened, the
    // wording lives in data_intranet.js and the count is filled in here.
    const careerNotes = (data.hr?.notes ?? [])
        .map(({ key, count }) => {
            const n = src.hr.careerNotes?.[key];
            return n ? { tone: n.tone, title: String(n.title).replace('{count}', count), text: n.text } : null;
        })
        .filter(Boolean);
    const notes = careerNotes.length ? careerNotes
        : [{ tone: src.hr.traitsNone.tone, title: src.hr.traitsNone.title, text: src.hr.traitsNone.text }];

    return {
        employee,
        feed: (data.feed ?? []).map(i => row(src.feed, i)).filter(Boolean),
        incident: { days: data.incident?.days ?? 0, note: row(src.incident, data.incident?.idx)?.note ?? null },

        // The fixed frame of each page. It never depended on anything and used
        // to be copied through the state all the same, "so the component reads
        // one object rather than two sources" - which is precisely how it came
        // to be a snapshot.
        dashboard: { page: src.dashboard.page },

        vision_quote: row(src.visions, data.visionQuote),
        status: (data.status ?? []).map(i => row(src.status, i)).filter(Boolean),

        kpi: data.kpi?.blind
            ? { value: src.kpi.blind.value, text: src.kpi.blind.text }
            : { value: String(data.kpi?.tickets ?? 0),
                text: row(src.kpi.levels, data.kpi?.levelIdx)?.text ?? null },

        chantal: {
            top: data.chantal?.top ? src.chantal[data.chantal.top] : null,
            older: row(src.chantal.older, data.chantal?.olderIdx),
            page: src.chantal.page,
        },

        vision: {
            extra: data.vision?.extra ? src.vision[data.vision.extra] : null,
            note: data.vision?.note ? src.vision.editorNote : null,
            page: src.vision.page,
        },

        sales: {
            extra: data.sales?.extra ? src.sales[data.sales.extra] : null,
            phoenix: data.sales?.phoenix ? src.sales.phoenix : null,
            page: src.sales.page,
        },

        kantine: {
            page: src.kantine.page,
            today: data.kantine?.today,
            service: { ...(src.service[data.kantine?.service] ?? src.service.before) },
            hygiene: row(src.hygiene, data.kantine?.hygieneIdx),
            done: data.kantine?.done ? src.service.done : null,
        },

        impressum: {
            version: data.impressum?.version,
            note: src.impressum.versionNote,
            clause: row(src.impressum.clauses, data.impressum?.clauseIdx),
            page: src.impressum.page,
        },

        hr: {
            page: src.hr.page,
            policy: src.hr.policy,
            support: src.hr.support,
            probation: data.hr?.probation,
            salary: src.hr.salary,
            salaryNote: src.hr.salaryNote,
            loyalty: row(src.hr.loyalty, data.hr?.loyaltyIdx),
            notes,
            documents: src.hr.documents,
        },
    };
}
