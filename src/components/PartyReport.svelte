<!--
  The gala's own summary, above the week balance.

  Same story as WeekBalance: engine_events.finishParty() built this as HTML and
  it froze in the language of the evening it described. Three parts, and each one
  is now an identity rather than a sentence — the ending's name is a reference
  into the data tree, the level is an id, and the achievements of the evening are
  the ids the state already collected.
-->
<script>
    import { renderRecipe } from '../engine/recipe.js';
    import { tree, t, tf } from '../i18n/i18n.svelte.js';

    /** @type {{ report: { subtitle: any, l: number, a: number, mode: object, achievements: string[] } }} */
    let { report } = $props();

    // "LEGENDE" / "LEGEND" — prose from the data tree, so it arrives as a
    // reference to the option that produced it. A direct call (the test
    // harness) hands the word itself, and then the word is all there is.
    const subtitle = $derived(
        typeof report.subtitle === 'string' ? report.subtitle : renderRecipe(report.subtitle) ?? ''
    );

    // The same three captions the day report uses, from the same keys: both name
    // the day that has just ended, so they must not drift.
    // i18n-uses: dayReport.diff.easy, dayReport.diff.normal, dayReport.diff.hard
    // i18n-uses: week.diff.easy, week.diff.normal, week.diff.hard
    const badge = $derived(report.mode?.week
        ? tf('week.badge', { mode: t(`week.diff.${report.mode.level ?? 'normal'}`) })
        : t(`dayReport.diff.${report.mode?.diff ?? 'normal'}`));

    // Read through tree(), never off DB: the language rune has to be read on the
    // way past or this list keeps yesterday's language (see CLAUDE.md).
    const earned = $derived(
        (report.achievements ?? [])
            .map(id => (tree()?.achievements ?? []).find(a => a.id === id))
            .filter(Boolean)
    );
</script>

<div class="text-3xl font-black text-white text-center mb-6 uppercase tracking-wider not-italic">{subtitle}</div>

<div class="bg-slate-950 p-4 rounded-lg border border-pink-500/50 my-4 shadow-inner shadow-pink-900/10">
    <div class="text-[10px] text-pink-400 uppercase tracking-widest mb-2">
        {t('party.report.title')} <span class="text-white font-bold">{badge}</span>
    </div>
    <div class="grid grid-cols-2 gap-2 text-center font-mono">
        <div class="flex flex-col">
            <span class="text-emerald-400 font-bold text-xl">{report.l}%</span>
            <span class="text-[10px] text-slate-400">{t('party.report.chill')}</span>
        </div>
        <div class="flex flex-col">
            <span class="text-orange-400 font-bold text-xl">{report.a}%</span>
            <span class="text-[10px] text-slate-400">{t('party.report.cringe')}</span>
        </div>
    </div>
</div>

{#if earned.length}
    <div class="mt-2 border-t border-slate-700 pt-2">
        <div class="font-bold text-yellow-400 mb-2 text-xs uppercase">{t('achievement.today')}</div>
        {#each earned as a (a.id)}
            <div class="text-xs text-slate-300">🏆 {a.icon ?? ''} {a.title}</div>
        {/each}
    </div>
{/if}
