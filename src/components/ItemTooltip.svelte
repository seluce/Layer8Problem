<!--
  The floating box above an item slot: name, flavour text and the line about
  what happens on use.

  Purely presentational. Who pins it, where it may sit and what counts as
  locked is decided by the view (InventoryFull, ArchiveView) - this file only
  draws the result, so the backpack and the archive cannot drift apart.

  The box relies on a `group` class and `relative` positioning on its parent
  slot: visibility comes from group-hover plus the pinned flag the view
  passes in.

  Locked mode exists for the archive. A tile that reacts to a tap with
  nothing feels broken on touch, so locked tiles answer with a minimal box -
  without leaking name or flavour of something not yet found.
-->
<script>
    import { t } from '../i18n/i18n.svelte.js';

    let {
        item = null,
        pinned = false,
        pos,
        locked = false,
        // The archive uses different placeholders per grid: the word for
        // 'unknown' on equipment, '???' on trophies.
        lockedTitle = '???'
    } = $props();
</script>

<div class="absolute bottom-[110%] {pos.box} mb-2 w-56 p-3 bg-slate-950 border border-slate-600 rounded-lg shadow-xl {pinned ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 focus-within:opacity-100 transition-opacity pointer-events-none z-50 text-left">
    {#if locked}
        <!-- Grey rather than the amber of a found item, but readable: at
             slate-400/500 the locked box was the faintest thing on screen and
             sat right over the section heading. -->
        <div class="font-bold text-slate-200 text-sm border-b border-slate-700 pb-1 mb-1">{lockedTitle}</div>
        <div class="text-[10px] text-slate-400 italic leading-snug">{t('item.notFound')}</div>
    {:else}
        <div class="font-bold text-amber-400 text-sm border-b border-slate-700 pb-1 mb-1">{item.name}</div>
        <div class="text-[10px] text-slate-300 italic leading-snug">{item.flavor ?? t('item.noInfo')}</div>
        <!-- Whether an item survives being used was written down nowhere -
             you found out once it was gone. -->
        <div class="text-[9px] font-mono uppercase tracking-wider mt-1.5 pt-1.5 border-t border-slate-800
                    {item.quest ? 'text-amber-500' : item.passive ? 'text-indigo-300' : item.keep ? 'text-sky-400' : 'text-slate-500'}">
            {#if item.quest}{t('item.kind.trophy')}
            {:else if item.passive}{t('item.kind.passive')}
            {:else if item.keep}{t('item.kind.reusable')}
            {:else}{t('item.kind.consumed')}{/if}
        </div>
    {/if}
    <div class="absolute top-full {pos.arrow} border-4 border-transparent border-t-slate-600"></div>
</div>
