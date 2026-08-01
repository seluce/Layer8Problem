<!--
  Die Kurve des Arbeitstags: Faulheit, Aggro und Chef-Radar über der Zeit.

  Handgezeichnetes SVG statt einer Diagramm-Bibliothek — es sind drei
  Polylinien, und der Rest des Spiels kommt auch ohne aus. Gezeichnet wird aus
  state.statHistory, das die Engine bei jeder Wirkung fortschreibt.

  Die Ventil-Sprünge (Ausraster, Abmahnung) brauchen keine Sondermarkierung:
  Ein Wert, der von 100 auf 50 fällt, ist in der Kurve deutlicher zu sehen als
  jedes Symbol daneben.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';

    // Zeichenfläche in Nutzerkoordinaten; das SVG skaliert per viewBox mit.
    const W = 520, H = 180;
    const PAD = { l: 30, r: 10, t: 12, b: 22 };

    const points = $derived(state.statHistory ?? []);

    // Der Tag läuft von 8:00 bis mindestens 16:30 — außer jemand hat länger
    // gemacht, dann wächst die Achse mit.
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

    // Volle Stunden als Zeitachse, damit man den Tag wiedererkennt.
    const hours = $derived(
        Array.from({ length: Math.floor(tMax / 60) - 7 }, (_, i) => (8 + i) * 60)
            .filter(t => t <= tMax)
    );

    const pad = (n) => String(n).padStart(2, '0');
</script>

{#if points.length > 1}
    <svg viewBox="0 0 {W} {H}" class="w-full h-auto" role="img"
         aria-label="Verlauf von Faulheit, Aggro und Chef-Radar über den Arbeitstag">

        <!-- Waagerechte Hilfslinien bei 0, 50 und 100 Prozent -->
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
