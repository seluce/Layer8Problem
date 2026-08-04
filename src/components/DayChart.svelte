<!--
  The curve of the workday: laziness, aggro and boss radar over time.

  Hand-drawn SVG instead of a chart library — it is three polylines, and the
  rest of the game gets by without one too. Drawn from state.statHistory,
  which the engine appends to on every effect.

  The safety-valve jumps (outburst, written warning) need no special marker:
  a value falling from 100 to 50 is easier to see in the curve than any
  symbol next to it.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';

    // Drawing area in user units; the SVG scales along via viewBox.
    const W = 520, H = 180;
    const PAD = { l: 30, r: 10, t: 12, b: 22 };

    const points = $derived(state.statHistory ?? []);

    // The day runs from 8:00 to at least 16:30 - unless someone stayed
    // longer, in which case the axis grows with it.
    const tMin = 8 * 60;
    const tMax = $derived(Math.max(16 * 60 + 30, ...points.map(p => p.t)));

    const x = (t) => PAD.l + ((t - tMin) / (tMax - tMin)) * (W - PAD.l - PAD.r);
    const y = (v) => PAD.t + (1 - Math.min(100, Math.max(0, v)) / 100) * (H - PAD.t - PAD.b);

    const line = (key) => points.map(p => `${x(p.t).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ');

    const SERIES = [
        { key: 'f', label: 'Faulheit', color: '#34d399' },
        { key: 'a', label: 'Aggro',    color: '#fb923c' },
        { key: 'c', label: 'Chef',     color: '#ef4444' }
    ];

    // Full hours as the time axis, so the day is recognisable.
    const hours = $derived(
        Array.from({ length: Math.floor(tMax / 60) - 7 }, (_, i) => (8 + i) * 60)
            .filter(t => t <= tMax)
    );

    const pad = (n) => String(n).padStart(2, '0');
</script>

{#if points.length > 1}
    <svg viewBox="0 0 {W} {H}" class="w-full h-auto" role="img"
         aria-label="Verlauf von Faulheit, Aggro und Chef-Radar über den Arbeitstag">

        <!-- Horizontal guide lines at 0, 50 and 100 percent -->
        {#each [0, 50, 100] as v}
            <line x1={PAD.l} y1={y(v)} x2={W - PAD.r} y2={y(v)}
                  stroke="#334155" stroke-width="1" stroke-dasharray={v === 100 ? '0' : '3 3'} />
            <text x={PAD.l - 6} y={y(v) + 3} text-anchor="end"
                  font-size="8" fill="#64748b" font-family="monospace">{v}</text>
        {/each}

        <!-- Zeitachse -->
        {#each hours as t}
            <line x1={x(t)} y1={PAD.t} x2={x(t)} y2={H - PAD.b}
                  stroke="#1e293b" stroke-width="1" />
            <text x={x(t)} y={H - PAD.b + 12} text-anchor="middle"
                  font-size="8" fill="#64748b" font-family="monospace">{pad(t / 60)}</text>
        {/each}

        <!-- Die drei Kurven -->
        {#each SERIES as s}
            <polyline points={line(s.key)} fill="none" stroke={s.color}
                      stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
            <circle cx={x(points[points.length - 1].t)} cy={y(points[points.length - 1][s.key])}
                    r="2.5" fill={s.color} />
        {/each}
    </svg>

    <div class="flex justify-center gap-4 mt-1">
        {#each SERIES as s}
            <span class="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span class="inline-block w-3 h-0.5 rounded-full" style="background:{s.color}"></span>
                {s.label}
            </span>
        {/each}
    </div>
{:else}
    <p class="text-[11px] text-slate-500 font-mono text-center py-4">
        Zu wenige Entscheidungen für eine Kurve.
    </p>
{/if}
