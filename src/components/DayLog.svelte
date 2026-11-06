<!--
  The day's log on the end screen (7.1), beside the curve and the diary.

  The log panel on the right is covered the moment the day ends, and until now
  that was the last anyone saw of it - the one place that says, line by line,
  what the day did. Here it reads top to bottom, the way the day went, where
  the panel reads newest first. A button puts it on the clipboard as plain
  text; where the clipboard refuses, the lines are selected and copied the
  older way, and where that is refused too they stay selected, so a copy by
  hand is one key away.

  The lines are the same entries the panel shows, resolved the same way: a
  recipe repaints in the language on screen, and one that no longer resolves
  is left out rather than guessed at (see engine/recipe.js). How many a day
  keeps is LOG_MAX_ENTRIES in engine_ui.js.
-->
<script>
    // Renamed so the $state rune stays usable in this file - see CLAUDE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { renderRecipe } from '../engine/recipe.js';
    import { t } from '../i18n/i18n.svelte.js';

    const lines = $derived(
        game.logEntries
            .map(e => ({ id: e.id, time: e.time, color: e.color, text: renderRecipe(e) }))
            .filter(line => line.text !== null)
    );

    // 'ok' for a moment after a copy, 'failed' until the next try.
    let copied = $state(null);
    let reset = null;

    function selectLines() {
        const list = document.getElementById('day-log-lines');
        const sel = window.getSelection?.();
        if (!list || !sel) return;
        const range = document.createRange();
        range.selectNodeContents(list);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    async function copy() {
        const text = lines.map(line => `[${line.time}] ${line.text}`).join('\n');
        clearTimeout(reset);
        let done = false;
        try { await navigator.clipboard.writeText(text); done = true; }
        catch {
            // The older way, which some embedded browsers still allow where
            // they refuse the clipboard API: copy what is selected. Selected
            // either way, so a failure leaves the lines ready for a copy by hand.
            selectLines();
            try { done = document.execCommand('copy'); } catch { done = false; }
        }
        copied = done ? 'ok' : 'failed';
        if (done) reset = setTimeout(() => { copied = null; }, 2000);
    }
</script>

<div class="text-left">
    <div class="flex items-center justify-end gap-3 mb-2">
        <button type="button" onclick={copy}
                class="text-[0.6875rem] font-mono uppercase tracking-widest border rounded-sm px-3 py-1 transition-colors
                       {copied === 'ok' ? 'text-emerald-400 border-emerald-600/60' : 'text-slate-300 hover:text-amber-400 border-slate-700 hover:border-amber-600/60'}">
            {copied === 'ok' ? t('end.log.copied') : t('end.log.copy')}
        </button>
    </div>
    {#if copied === 'failed'}
        <p class="text-xs text-red-400 mb-2" role="status">{t('end.log.copyFailed')}</p>
    {/if}
    <ol id="day-log-lines" aria-label={t('end.log.aria')}
        class="max-h-64 overflow-y-auto font-mono text-xs leading-relaxed space-y-0.5 pr-1">
        {#each lines as line (line.id)}
            <li class="break-words"><span class="text-slate-400">[{line.time}]</span> <span class={line.color}>{line.text}</span></li>
        {/each}
    </ol>
</div>
