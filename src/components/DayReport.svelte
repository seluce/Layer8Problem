<!--
  The day's balance sheet on the end screen.

  engine_core.buildDayReport() used to assemble this block as an HTML string.
  As a component it can do something the string never could: highlight the
  value the day broke on. Whoever got fired should see the boss radar, not
  three equally loud numbers.
-->
<script>
    import { state as game } from '../engine/engine_state.svelte.js';
    import { dayName } from '../engine/engine_week.js';
    import { t, tf } from '../i18n/i18n.svelte.js';

    // `week` is { mode, day } while a week is being reported, null in day mode.
    // It has to be handed in: finishWeek() clears week.active before the screen
    // is built, so the state can no longer be asked - see showEnd().
    let { cause = null, week = null } = $props();

    // i18n-uses: dayReport.diff.easy, dayReport.diff.hard, dayReport.diff.normal
    const DIFF = [
        { test: (m) => m < 1.0,  label: 'dayReport.diff.easy' },
        { test: (m) => m > 1.0,  label: 'dayReport.diff.hard' },
        { test: () => true,      label: 'dayReport.diff.normal' }
    ];

    // In a week the three labels above are the wrong question: they name the
    // DAY mode's level, and difficultyMult stays at 1.0 in a week by design, so
    // the answer was always "WEDNESDAY (normal)" - on a Friday, in a week
    // headed IN NEED OF LEAVE. The week names its own day and its own level.
    // i18n-uses: week.diff.easy, week.diff.hard, week.diff.normal
    const diffName = $derived(week
        ? tf('dayReport.diff.week', {
              day:  dayName((week.day ?? 1) - 1).toUpperCase(),
              mode: t(`week.diff.${week.mode ?? 'normal'}`)
          })
        : t(DIFF.find(d => d.test(game.difficultyMult)).label));

    // Which value ended the day? Only these causes point at a bar; clocking
    // off and the party have no culprit.
    const CULPRIT = { rage: 'al', chef: 'cr' };

    const stats = $derived([
        { key: 'fl', label: t('stat.lazy'),        value: Math.round(game.fl), color: 'text-emerald-400',
          badge: null },
        { key: 'al', label: t('stat.aggro'),       value: Math.round(game.al), color: 'text-orange-400',
          badge: game.rageWarningReceived ? { text: t('dayReport.valveUsed'), cls: 'text-orange-400 border-orange-500/80 bg-orange-950/30 -rotate-3' } : null },
        { key: 'cr', label: t('stat.radar.short'), value: Math.round(game.cr), color: 'text-red-500',
          badge: game.chefWarningReceived ? { text: t('team.reprimanded'), cls: 'text-red-500 border-red-500/80 bg-red-950/30 rotate-2' } : null }
    ]);

    const guilty = $derived(CULPRIT[cause] ?? null);
</script>

<div class="bg-slate-950 p-4 rounded-lg border border-slate-700 my-4 shadow-inner">
    <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-3">
        {t('dayReport.title')} <span class="text-white font-bold">{diffName}</span>
    </div>

    <div class="grid grid-cols-3 gap-2 text-center font-mono">
        {#each stats as s (s.key)}
            <div class="flex flex-col items-center rounded-md py-2 transition-colors
                        {guilty === s.key ? 'bg-slate-900 ring-1 ring-inset ring-current ' + s.color : ''}">
                <span class="{s.color} font-bold text-xl">{s.value}%</span>
                <span class="text-[10px] text-slate-400">{s.label}</span>

                {#if guilty === s.key}
                    <span class="text-[9px] font-bold {s.color} mt-1 tracking-wider">{t('dayReport.endedHere')}</span>
                {/if}

                {#if s.badge}
                    <span class="text-[8px] font-mono font-bold tracking-widest border-2 rounded-xs px-1.5 py-0.5 mt-2 inline-block {s.badge.cls}">
                        {s.badge.text}
                    </span>
                {/if}
            </div>
        {/each}
    </div>

    {#if cause === 'tickets'}
        <div class="mt-3 pt-3 border-t border-slate-800 text-center">
            <span class="text-purple-400 font-mono font-bold text-lg">{game.tickets}</span>
            <span class="text-[10px] text-slate-400 ml-1 uppercase tracking-widest">{t('dayReport.openTickets')}</span>
            <span class="block text-[9px] font-bold text-purple-400 mt-1 tracking-wider">{t('dayReport.endedHere')}</span>
        </div>
    {/if}
</div>
