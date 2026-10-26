/**
 * The day as a picture, for passing on.
 *
 * The game is free and lives on being shown to somebody. Until 6.4 all a
 * player could hand over was the address - which says nothing about the
 * afternoon they just had. This draws the end of a day: the verdict, where
 * the four values ended up, and the curve that got them there.
 *
 * Drawn on a canvas rather than converted from the SVG the end screen shows.
 * An SVG carried into a canvas depends on the fonts and the stylesheet coming
 * with it, and a foreign font taints the canvas so the picture cannot be read
 * back out at all. The curve is four polylines over `statHistory`; drawing
 * them twice costs less than one evening of debugging a blank PNG.
 *
 * Nothing here reads the DOM, so a test bench can call it with a stub canvas.
 */

/** 1200x630 is what a link preview expects, and what a chat shows unscaled. */
export const CARD = { w: 1200, h: 630 };

const COLOURS = {
    page:    '#080e20',
    panel:   '#0f172a',
    edge:    '#1e293b',
    guide:   '#334155',
    ink:     '#e2e8f0',
    muted:   '#94a3b8',
    faint:   '#64748b',
    win:     '#34d399',
    loss:    '#f87171',
};

/**
 * The four lines, in the order the numbers above them are written.
 *
 * SOLID, and the one place this picture deliberately differs from the end
 * screen: there the four carry dash patterns so they can be told apart
 * without colour, and that is right for a surface somebody reads. Drawn at
 * this size, four dashed lines crossing each other read as a scribble - the
 * first version of this card proved it. A picture handed to a stranger has
 * one job, which is to be legible at a glance, so it gets solid lines and the
 * key the end screen's legend provides.
 */
/** Read by the ticket axis as well as by the line itself. */
const TICKET_COLOUR = '#c084fc';

const SERIES = [
    { key: 'l',  colour: '#34d399' },
    { key: 'a',  colour: '#fb923c' },
    { key: 'b',  colour: '#ef4444' },
    { key: 'tk', colour: TICKET_COLOUR, scale: 10 },
];

const MONO = '"JetBrains Mono", ui-monospace, monospace';

/**
 * Draws the card.
 *
 * @param {CanvasRenderingContext2D} ctx  a 1200x630 context
 * @param {object} card                   what to write on it
 * @param {string} card.title             the verdict, one line
 * @param {string} card.lead              the sentence under it
 * @param {string} card.mode              workday or working week, as a word
 * @param {{label: string, value: string, colour: string}[]} card.stats
 * @param {{m: number, l: number, a: number, b: number, tk?: number}[]} card.points
 * @param {boolean} card.isWin
 * @param {string} card.curveLabel        what the panel below shows - one day,
 *        and in a working week which of the five, because statHistory never
 *        spans more than a day
 * @param {string} card.url               where to find the game
 */
export function drawDayCard(ctx, card) {
    const { w, h } = CARD;

    ctx.fillStyle = COLOURS.page;
    ctx.fillRect(0, 0, w, h);

    // The accent edge along the top, the way every panel in the game carries one.
    ctx.fillStyle = card.isWin ? COLOURS.win : COLOURS.loss;
    ctx.fillRect(0, 0, w, 6);

    // --- the name, small and out of the way ---
    ctx.font = `700 24px ${MONO}`;
    ctx.fillStyle = COLOURS.faint;
    ctx.textBaseline = 'top';
    ctx.fillText('LAYER8PROBLEM', 56, 48);

    ctx.font = `400 20px ${MONO}`;
    ctx.fillStyle = COLOURS.muted;
    ctx.textAlign = 'right';
    ctx.fillText(card.mode, w - 56, 50);
    ctx.textAlign = 'left';

    // --- the verdict ---
    ctx.font = `700 54px ${MONO}`;
    ctx.fillStyle = card.isWin ? COLOURS.win : COLOURS.loss;
    ctx.fillText(clip(ctx, card.title, w - 112), 56, 108);

    ctx.font = `400 24px ${MONO}`;
    ctx.fillStyle = COLOURS.ink;
    wrap(ctx, card.lead, 56, 184, w - 112, 34, 2);

    // --- the four numbers ---
    const statY = 268;
    const colW = (w - 112) / card.stats.length;
    card.stats.forEach((s, i) => {
        const cx = 56 + colW * i;
        ctx.font = `700 46px ${MONO}`;
        ctx.fillStyle = s.colour;
        ctx.fillText(s.value, cx, statY);
        ctx.font = `400 18px ${MONO}`;
        ctx.fillStyle = COLOURS.faint;
        ctx.fillText(s.label.toUpperCase(), cx, statY + 56);
    });

    // --- the curve ---
    //
    // Named, because `statHistory` is ONE DAY. In a working week the heading
    // above says "WOCHE (Genervt)" while the panel shows Friday, and a
    // stranger reads that as the week - so the panel says which day it is.
    ctx.font = `400 16px ${MONO}`;
    ctx.fillStyle = COLOURS.faint;
    ctx.fillText(card.curveLabel.toUpperCase(), 56, 350);

    const box = { x: 56, y: 372, w: w - 112, h: 170 };
    ctx.fillStyle = COLOURS.panel;
    ctx.fillRect(box.x, box.y, box.w, box.h);
    ctx.strokeStyle = COLOURS.edge;
    ctx.lineWidth = 1;
    ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1);
    const drawn = drawCurve(ctx, box, card.points);

    // --- the key the curve needs ---
    // Without one the picture is four coloured lines and no answer to what
    // they are. Only the lines that were actually drawn, so an older day
    // without its tickets does not advertise a line it has not got.
    let lx = 56;
    ctx.font = `400 18px ${MONO}`;
    card.stats.forEach((s, i) => {
        if (!drawn.includes(SERIES[i]?.key)) return;
        ctx.fillStyle = s.colour;
        ctx.fillRect(lx, 572, 26, 4);
        ctx.fillStyle = COLOURS.faint;
        ctx.fillText(s.label.toUpperCase(), lx + 36, 564);
        lx += 36 + ctx.measureText(s.label.toUpperCase()).width + 40;
    });

    // --- where to get it ---
    ctx.font = `400 22px ${MONO}`;
    ctx.fillStyle = COLOURS.muted;
    ctx.textAlign = 'right';
    ctx.fillText(card.url, w - 56, h - 44);
    ctx.textAlign = 'left';
}

/**
 * The four lines inside the panel.
 * @returns {string[]} which of them were drawn, for the key underneath.
 */
function drawCurve(ctx, box, points) {
    if (!points || points.length < 2) return [];

    // Room inside the frame for the scales. Without them the card was four
    // lines over an empty box: a stranger could not tell which way is bad, nor
    // over how long. The end screen's chart carries all three axes and the
    // picture handed to that stranger needs them more, not less.
    const inner = { x: box.x + 36, y: box.y + 14, w: box.w - 36 - 30, h: box.h - 14 - 26 };

    const tMin = 8 * 60;
    const tMax = Math.max(16 * 60 + 30, ...points.map(p => p.m ?? 0));
    const x = (m) => inner.x + ((m - tMin) / (tMax - tMin)) * inner.w;
    const y = (v) => inner.y + inner.h - (Math.min(100, Math.max(0, v)) / 100) * inner.h;

    const hasTickets = points.some(p => p.tk !== undefined);

    // Percent down the left, with a guide across - a shade lighter than the
    // frame, or the panel is just an empty box with lines in it.
    ctx.font = `400 15px ${MONO}`;
    ctx.textBaseline = 'middle';
    for (const v of [0, 50, 100]) {
        ctx.setLineDash(v === 100 ? [] : [3, 5]);
        ctx.strokeStyle = COLOURS.guide;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(inner.x, y(v));
        ctx.lineTo(inner.x + inner.w, y(v));
        ctx.stroke();

        ctx.fillStyle = COLOURS.faint;
        ctx.textAlign = 'right';
        ctx.fillText(String(v), inner.x - 8, y(v));

        // Tickets run to ten where the stats run to a hundred, so they get
        // their own scale on the right - in their own colour, so nobody reads
        // the ten as a hundred.
        if (hasTickets) {
            ctx.fillStyle = TICKET_COLOUR;
            ctx.textAlign = 'left';
            ctx.fillText(String(Math.round((v / 100) * 10)), inner.x + inner.w + 8, y(v));
        }
    }

    // The hours along the bottom, so the shape has a duration.
    ctx.fillStyle = COLOURS.faint;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let hour = 8; hour * 60 <= tMax; hour += 2) {
        ctx.fillText(String(hour).padStart(2, '0'), x(hour * 60), inner.y + inner.h + 8);
    }
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Back to solid, or the four below inherit the guide's dashes - which is
    // exactly the scribble this card was redrawn to get rid of.
    ctx.setLineDash([]);

    const drawn = [];
    for (const s of SERIES) {
        if (s.key === 'tk' && !hasTickets) continue;   // an older day never recorded them
        drawn.push(s.key);
        ctx.strokeStyle = s.colour;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        points.forEach((p, i) => {
            const value = s.scale ? ((p[s.key] ?? 0) / s.scale) * 100 : (p[s.key] ?? 0);
            const px = x(p.m ?? 0), py = y(value);
            if (!i) ctx.moveTo(px, py);
            // Tickets step: a ticket is a whole ticket, so it holds its height
            // until the next point and then jumps - as on the end screen.
            else if (s.scale) { ctx.lineTo(px, ctx.__lastY ?? py); ctx.lineTo(px, py); }
            else ctx.lineTo(px, py);
            ctx.__lastY = py;
        });
        ctx.stroke();
        delete ctx.__lastY;
    }
    return drawn;
}

/** Cuts a line to the width it has, with an ellipsis if it did not fit. */
function clip(ctx, text, maxWidth) {
    let out = String(text ?? '');
    if (ctx.measureText(out).width <= maxWidth) return out;
    while (out.length > 1 && ctx.measureText(out + '…').width > maxWidth) out = out.slice(0, -1);
    return out + '…';
}

/** Lays a sentence out over at most `maxLines` lines. */
function wrap(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = String(text ?? '').split(/\s+/).filter(Boolean);
    let line = '', drawn = 0;
    for (let i = 0; i < words.length; i++) {
        const next = line ? line + ' ' + words[i] : words[i];
        if (ctx.measureText(next).width > maxWidth && line) {
            drawn++;
            if (drawn === maxLines) { ctx.fillText(clip(ctx, next, maxWidth), x, y); return; }
            ctx.fillText(line, x, y);
            y += lineHeight;
            line = words[i];
        } else {
            line = next;
        }
    }
    if (line) ctx.fillText(clip(ctx, line, maxWidth), x, y);
}
