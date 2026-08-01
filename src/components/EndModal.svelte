<!--
  Der große Bildschirm in der Mitte: Tagesende, Niederlage, Warnungen.

  Aufbau von oben nach unten: Titel, ein Satz zum Ausgang, die Bilanz mit
  hervorgehobener Ursache, darunter aufklappbar Verlauf und Logbuch. Die
  Reihenfolge ist Absicht — erst die Nachricht, dann die Zahlen, dann die
  Analyse für die, die sie wollen.

  Bis v4.0.0 kam all das als eine HTML-Zeichenkette aus der Engine. Jetzt
  liefert sie Felder (lead, cause, diary), und die Bestandteile sind eigene
  Komponenten. `text` gibt es weiterhin: Warnungen und die Party bringen ihre
  eigene Zusammenfassung mit.
-->
<script>
    // Umbenannt, damit die Rune $state in dieser Datei nutzbar bleibt —
    // siehe Fallstrick in STRUCTURE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import DayChart from './DayChart.svelte';
    import DayReport from './DayReport.svelte';
    import DiaryEntry from './DiaryEntry.svelte';

    const modal = $derived(game.modal);

    // Wer die Kurve immer sehen will, stellt das in den Einstellungen ein.
    let showChart = $state(game.autoChart ?? false);
    let showDiary = $state(false);

    // First match wins; red is the default.
    const THEMES = [
        { match: ['FEIERABEND'],        title: 'text-green-500',  border: 'border-green-500' },
        { match: ['GALA VORBEI'],       title: 'text-pink-500',   border: 'border-pink-500' },
        { match: ['VENTIL', 'RAGE'],    title: 'text-orange-500', border: 'border-orange-500' }
    ];
    const DEFAULT_THEME = { title: 'text-red-500', border: 'border-red-600' };

    const theme = $derived(
        THEMES.find(t => t.match.some(m => (modal.title ?? '').includes(m))) ?? DEFAULT_THEME
    );

    // Anything that ends the run needs a reload; a mere warning can be
    // dismissed and play continues.
    const FINAL = ['QUIT', 'GEFEUERT', 'FEIERABEND', 'GALA VORBEI'];
    const isFinal = $derived(modal.isEnd || FINAL.some(m => (modal.title ?? '').includes(m)));

    const hasChart = $derived((game.statHistory?.length ?? 0) > 2);
    const hasDiary = $derived(!!modal.diary);

    // Einordnung: Was der Tag in der Laufbahn bedeutet. Die Zähler stehen im
    // Archiv und überleben den Neustart — das macht aus Einzeltagen eine Serie.
    const stats = $derived(game.archive?.stats ?? {});
    const tally = $derived(
        (stats.daysStarted ?? 0) > 1
            ? `Arbeitstag Nr. ${stats.daysStarted} · ${stats.daysSurvived ?? 0} überstanden`
            : null
    );
</script>

{#if modal.open}
    <!-- Keeps the id: the keyboard handlers in engine.js find the confirm
         button through #modal-content. -->
    <div id="modal-content" class="max-w-2xl w-full bg-slate-900 border-2 {theme.border} p-8 rounded-xl text-center shadow-2xl max-h-[90vh] overflow-y-auto">

        <h1 class="text-4xl font-black {theme.title} mb-1">{modal.title}</h1>

        {#if tally && isFinal}
            <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">{tally}</div>
        {:else}
            <div class="mb-4"></div>
        {/if}

        {#if modal.lead}
            <p class="text-lg text-slate-300 italic mb-2">{modal.lead}</p>
        {/if}

        <!-- Warnungen und die Party bringen eigenen Text mit. Er stammt aus
             der Engine, nie vom Spieler. -->
        {#if modal.text}
            <div class="text-lg text-slate-300 italic">{@html modal.text}</div>
        {/if}

        {#if isFinal}
            <DayReport cause={modal.cause} />
        {/if}

        {#if isFinal && (hasChart || hasDiary)}
            <div class="flex flex-wrap justify-center gap-2 mb-4">
                {#if hasChart}
                    <button type="button" onclick={() => showChart = !showChart}
                            aria-expanded={showChart}
                            class="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 border border-slate-700 hover:border-amber-600/60 rounded-sm px-3 py-1.5 transition-colors">
                        {showChart ? '▾' : '▸'} Tagesverlauf
                    </button>
                {/if}
                {#if hasDiary}
                    <button type="button" onclick={() => showDiary = !showDiary}
                            aria-expanded={showDiary}
                            class="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 border border-slate-700 hover:border-amber-600/60 rounded-sm px-3 py-1.5 transition-colors">
                        {showDiary ? '▾' : '▸'} 📖 Logbuch
                    </button>
                {/if}
            </div>

            {#if showChart}
                <div class="mb-4 bg-slate-950 border border-slate-700 rounded-lg p-3 shadow-inner">
                    <DayChart />
                </div>
            {/if}

            {#if showDiary}
                <div class="mb-6 py-2">
                    <DiaryEntry diary={modal.diary} />
                </div>
            {/if}
        {/if}

        <button onclick={() => isFinal ? location.reload() : engine.closeModal()}
                class="bg-white text-black px-8 py-3 rounded-sm font-bold uppercase hover:bg-slate-200 shadow-lg mt-2">
            {isFinal ? 'NEUSTART' : 'VERSTANDEN'}
        </button>
    </div>
{/if}
