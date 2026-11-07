<!--
  The side panel's entries for the intranet and the noticeboard (7.1).

  Each appears once a scene has opened its window - archive.doors, see
  engine_ui.DOORS - and opens the same window the scene does, minus the
  diary note. Not at the gala: neither the desk nor the kitchen is there.

  The mount target is a `contents` box inside the panel's grid, so these sit
  in the grid like the entries written into index.html beside them, and the
  classes are theirs.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { t } from '../i18n/i18n.svelte.js';
    import { engine } from '../engine.js';

    const doors = $derived(state.isPartyMode ? [] : (state.archive.doors ?? []));
</script>

{#if doors.includes('intranet')}
    <button type="button" onclick={() => engine.openIntranet()}
            class="cursor-pointer hover:bg-slate-800 rounded-sm px-1 transition-colors flex items-center gap-2 text-left">
        <span class="text-[0.625rem] text-sky-400 font-bold flex items-center gap-1 sm:gap-1.5 whitespace-nowrap overflow-hidden"><img src="assets/img/ui/ui_globe.webp" alt="" width="20" height="20" class="w-5 h-5 shrink-0 select-none"><span>{t('nav.intranet')}</span></span>
    </button>
{/if}

{#if doors.includes('board')}
    <button type="button" onclick={() => engine.openBoard()}
            class="cursor-pointer hover:bg-slate-800 rounded-sm px-1 transition-colors flex items-center gap-2 text-left">
        <span class="text-[0.625rem] text-orange-300 font-bold flex items-center gap-1 sm:gap-1.5 whitespace-nowrap overflow-hidden"><img src="assets/img/ui/ui_board.webp" alt="" width="20" height="20" class="w-5 h-5 shrink-0 select-none"><span>{t('nav.board')}</span></span>
    </button>
{/if}
