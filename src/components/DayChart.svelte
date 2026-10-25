<!--
  The curve of the workday: laziness, aggro, boss radar and the ticket pile.

  Hand-drawn SVG instead of a chart library — it is four polylines, and the
  rest of the game gets by without one too. Drawn from state.statHistory,
  which the engine appends to on every effect.

  The safety-valve jumps (outburst, written warning) need no special marker:
  a value falling from 100 to 50 is easier to see in the curve than any
  symbol next to it.

  Two things changed in 6.4, and both are about reading it:

  - The TICKETS are in it. The pile is the most common way to lose a day, and
    the one screen a player holds still and reads left out the thing that
    ended the run. They have their own scale, because ten is the end where
    the stats run to a hundred - hence the second axis on the right - and
    they step rather than slope, because a ticket is a whole ticket.
  - Every line carries a DASH PATTERN of its own. Three curves told apart by
    colour alone are three curves for anyone who cannot tell those colours
    apart, and red on green is the most common way not to.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';

    import { t } from '../i18n/i18n.svelte.js';
    // Drawing area in user units; the SVG scales along via viewBox.
    const W = 520, H = 180;
    // r is wide enough for the ticket axis on the right.
    const PAD = { l: 30, r: 26, t: 12, b: 22 };
    // The ticket counter ends the day at ten, so ten is the top of its scale.
    const TICKET_MAX = 10;

    const points = $derived(state.statHistory ?? []);

    // The day runs from 8:00 to at least 16:30 - unless someone stayed
    // longer, in which case the axis grows with it.
    const tMin = 8 * 60;
    // ?? 0 on every read - the statHistory reader contract (CLAUDE.md): a
    // missing key draws a flat line. Read raw, one point without m made tMax
    // NaN, which poisoned x() for every point, and one missing stat put NaN
    // into the polyline - SVG then dropped the whole curve silently, the
    // exact opposite of what the contract promises.
    const tMax = $derived(Math.max(16 * 60 + 30, ...points.map(p => p.m ?? 0)));

    const x = (t) => PAD.l + ((t - tMin) / (tMax - tMin)) * (W - PAD.l - PAD.r);
    const y = (v) => PAD.t + (1 - Math.min(100, Math.max(0, v)) / 100) * (H - PAD.t - PAD.b);

    const line = (key) => points.map(p => `${x(p.m ?? 0).toFixed(1)},${y(p[key] ?? 0).toFixed(1)}`).join(' ');

    /**
     * The ticket line, as steps.
     *
     * A ticket is a whole ticket: it is five, then six, never five and a half.
     * A sloping line would claim the hour in between was spent somewhere on
     * the way, so each point holds its height until the next one and then
     * jumps - which is also what makes the half-hour boundaries legible.
     */
    const ticketLine = $derived.by(() => {
        const out = [];
        points.forEach((p, i) => {
            const ty = y(((p.tk ?? 0) / TICKET_MAX) * 100);
            if (i) out.push(`${x(p.m ?? 0).toFixed(1)},${out[out.length - 1].split(',')[1]}`);
            out.push(`${x(p.m ?? 0).toFixed(1)},${ty.toFixed(1)}`);
        });
        return out.join(' ');
    });

    /**
     * Was this day recorded with its tickets?
     *
     * `tk` arrived in 6.4 (engine_core.migrateStatPoints says why it is not
     * filled in for older saves). An older day had tickets, nobody wrote them
     * down - so the line stays out rather than drawing a flat zero along the
     * bottom, which would read as "not one ticket all day".
     */
    const hasTickets = $derived(points.some(p => p.tk !== undefined));

    // Each line has a pattern of its own, so the four can be told apart
    // without relying on colour. `width` is what the legend swatch needs to
    // show the same pattern at a legible size.
    const SERIES = [
        // i18n-uses: stat.lazy, stat.aggro, stat.boss.short
        { key: 'l', label: 'stat.lazy',       color: '#34d399', dash: '0' },
        { key: 'a', label: 'stat.aggro',      color: '#fb923c', dash: '7 3' },
        { key: 'b', label: 'stat.boss.short', color: '#ef4444', dash: '2 3' }
    ];
    // i18n-uses: stat.tickets
    const TICKETS = { label: 'stat.tickets', color: '#c084fc', dash: '9 3 2 3' };

    // Full hours as the time axis, so the day is recognisable.
    const hours = $derived(
        Array.from({ length: Math.floor(tMax / 60) - 7 }, (_, i) => (8 + i) * 60)
            .filter(t => t <= tMax)
    );

    const pad = (n) => String(n).padStart(2, '0');
</script>

{#if points.length > 1}
    <svg viewBox="0 0 {W} {H}" class="w-full h-auto" role="img"
         aria-label={t('chart.aria')}>

        <!-- Horizontal guide lines at 0, 50 and 100 percent -->
        {#each [0, 50, 100] as v}
            <line x1={PAD.l} y1={y(v)} x2={W - PAD.r} y2={y(v)}
                  stroke="#334155" stroke-width="1" stroke-dasharray={v === 100 ? '0' : '3 3'} />
            <text x={PAD.l - 6} y={y(v) + 3} text-anchor="end"
                  font-size="8" fill="#64748b" font-family="monospace">{v}</text>
        {/each}

        <!-- Time axis -->
        {#each hours as t}
            <line x1={x(t)} y1={PAD.t} x2={x(t)} y2={H - PAD.b}
                  stroke="#1e293b" stroke-width="1" />
            <text x={x(t)} y={H - PAD.b + 12} text-anchor="middle"
                  font-size="8" fill="#64748b" font-family="monospace">{pad(t / 60)}</text>
        {/each}

        <!-- The ticket axis on the right, in its own colour so nobody reads
             the ten as a hundred. Drawn only when there is a line to scale. -->
        {#if hasTickets}
            {#each [0, 5, 10] as n}
                <text x={W - PAD.r + 6} y={y((n / TICKET_MAX) * 100) + 3} text-anchor="start"
                      font-size="8" fill={TICKETS.color} font-family="monospace">{n}</text>
            {/each}
        {/if}

        <!-- The three stats -->
        {#each SERIES as s}
            <polyline points={line(s.key)} fill="none" stroke={s.color} stroke-dasharray={s.dash}
                      stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
            <circle cx={x(points[points.length - 1].m)} cy={y(points[points.length - 1][s.key])}
                    r="2.5" fill={s.color} />
        {/each}

        <!-- The ticket pile, stepped and on its own scale -->
        {#if hasTickets}
            <polyline points={ticketLine} fill="none" stroke={TICKETS.color} stroke-dasharray={TICKETS.dash}
                      stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
            <circle cx={x(points[points.length - 1].m)}
                    cy={y(((points[points.length - 1].tk ?? 0) / TICKET_MAX) * 100)}
                    r="2.5" fill={TICKETS.color} />
        {/if}
    </svg>

    <div class="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-1">
        {#each hasTickets ? [...SERIES, TICKETS] : SERIES as s}
            <span class="flex items-center gap-1.5 text-[0.625rem] font-mono text-slate-400">
                <!-- The swatch carries the line's own pattern, or the legend
                     would be the one place that still says colour only. -->
                <svg width="16" height="4" viewBox="0 0 16 4" aria-hidden="true" class="shrink-0">
                    <line x1="0" y1="2" x2="16" y2="2" stroke={s.color} stroke-width="2"
                          stroke-dasharray={s.dash} />
                </svg>
                {t(s.label)}
            </span>
        {/each}
    </div>
{:else}
    <p class="text-[0.6875rem] text-slate-500 font-mono text-center py-4">
        {t('chart.tooFew')}
    </p>
{/if}
