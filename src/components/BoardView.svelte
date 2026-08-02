<!--
  The notes on the community board.

  The board frame itself (cork, wooden edge, heading) stays in index.html; this
  component fills the pinboard. Until v4.0.0 the notes were markup in there
  too, which meant the same six pieces of paper forever.

  Which notes are pinned up is decided once per day by engine_ui.openBoard()
  and kept in state.boardNotes - reopening the board must not reshuffle it, or
  the wall stops feeling like a place.

  The text fields carry <strong>, <em> and <br>, so they go through {@html}.
  They come from data/data_board.js and are never player input.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';

    const notes = $derived(state.boardNotes ?? []);

    // Shared base for every piece of paper. The gentle lift on hover used to
    // sit on the customer quote alone, which made that one note feel alive and
    // the rest like wallpaper.
    //
    // The tilt is set through the standalone `rotate` property, not through
    // `transform`: an inline transform would override Tailwind's hover:scale
    // and the lift would never happen.
    const PAPER = 'break-inside-avoid relative transition-transform duration-200 hover:scale-[1.03] hover:z-10';
</script>

<div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
    {#each notes as note (note.id)}

        {#if note.kind === 'tape'}
            <!-- A reply stuck on with tape rather than pinned -->
            <div class="{PAPER} p-4 shadow-xs ml-4" style="background:{note.paper}; rotate:{note.tilt}">
                <div class="w-12 h-3 bg-slate-200/50 absolute -top-2 left-10 rotate-1"></div>
                <p class="text-xs font-mono text-blue-900">{@html note.body}</p>
            </div>

        {:else if note.kind === 'quote'}
            <div class="{PAPER} p-6 shadow-md max-w-sm mx-auto font-mono text-sm text-slate-800" style="background:{note.paper}; rotate:{note.tilt}">
                <div class="w-4 h-4 rounded-full absolute -top-2 left-4 shadow-xs" style="background:{note.pin}"></div>
                <h3 class="font-bold underline mb-2">{note.title}</h3>
                <p class="leading-relaxed text-xs">{@html note.body}</p>
                <span class="block mt-4 text-[10px] text-slate-500 font-bold uppercase">{note.sign}</span>
                <!-- Coffee ring, because of course there is one -->
                <div class="absolute -bottom-4 -right-4 w-16 h-16 rounded-full border-4 border-[#d7ccc8] opacity-30 pointer-events-none"></div>
            </div>

        {:else if note.kind === 'official'}
            <div class="{PAPER} p-6 shadow-lg border border-slate-300" style="background:{note.paper}; rotate:{note.tilt}">
                <div class="w-4 h-4 rounded-full absolute top-2 right-2 shadow-xs" style="background:{note.pin}"></div>
                <div class="border-b-2 border-blue-900 mb-3 pb-1">
                    <span class="text-xl">{note.icon}</span>
                    <span class="font-bold text-blue-900 text-xs uppercase tracking-widest">{note.dept}</span>
                </div>
                <h4 class="font-bold text-sm mb-2 text-slate-800">{note.title}</h4>
                <p class="text-xs text-slate-600 leading-relaxed mb-3">{@html note.body}</p>
                {#if note.items?.length}
                    <ul class="list-disc pl-4 text-[10px] text-slate-600 space-y-1 mb-3">
                        {#each note.items as item, i (i)}<li>{item}</li>{/each}
                    </ul>
                {/if}
                {#if note.foot}
                    <div class="bg-slate-100 text-slate-500 text-[9px] p-2 text-center italic">{note.foot}</div>
                {/if}
            </div>

        {:else if note.kind === 'tearoff'}
            <div class="{PAPER} p-4 shadow-[2px_2px_5px_rgba(0,0,0,0.2)]" style="background:{note.paper}; rotate:{note.tilt}">
                <div class="w-3 h-3 rounded-full absolute -top-1.5 left-4" style="background:{note.pin}"></div>
                <h3 class="font-black text-2xl text-slate-800 mb-1">{note.title}</h3>
                <p class="font-bold text-xs text-red-600 mb-2 uppercase border-b border-red-200 pb-1">{note.sub}</p>
                <p class="text-xs text-slate-700 mb-2 leading-relaxed">{@html note.body}</p>
                {#if note.note}
                    <p class="text-[10px] text-slate-500 italic mt-2">{note.note}</p>
                {/if}
                <!-- The tear-off tabs nobody ever takes -->
                <div class="flex justify-between mt-4 border-t border-dashed border-slate-300 pt-1">
                    {#each note.tabs as tab, i (i)}
                        <div class="w-1/5 {i < note.tabs.length - 1 ? 'border-r border-dashed border-slate-300' : ''} h-10 text-[8px] text-slate-400 rotate-90 flex items-center justify-center cursor-pointer hover:text-red-500 hover:font-bold transition-colors">{tab}</div>
                    {/each}
                </div>
            </div>

        {:else if note.kind === 'press'}
            <div class="{PAPER} p-4 shadow-xs" style="background:{note.paper}; rotate:{note.tilt}">
                <div class="w-12 h-12 bg-yellow-600/10 rounded-full absolute -top-2 -left-2 blur-md pointer-events-none"></div>
                <div class="w-3 h-3 rounded-full absolute top-1 left-1/2" style="background:{note.pin}"></div>
                <h4 class="font-serif font-bold text-lg border-b border-slate-800 mb-2 pb-1 text-slate-900">{note.title}</h4>
                <h5 class="font-serif font-bold text-sm leading-tight mb-2 text-slate-900">{note.sub}</h5>
                <p class="font-serif text-xs text-justify leading-snug text-slate-800">{@html note.body}</p>
                {#if note.stamp}
                    <div class="mt-3 text-[10px] font-bold text-red-600 -rotate-3 border-2 border-red-600 inline-block px-2 py-0.5 rounded-xs transform origin-left">{note.stamp}</div>
                {/if}
            </div>

        {:else if note.kind === 'alert'}
            <div class="{PAPER} p-5 shadow-lg border-l-8" style="background:{note.paper}; rotate:{note.tilt}; border-left-color:{note.edge}">
                <div class="w-3 h-3 rounded-full absolute -top-1.5 left-4" style="background:{note.pin}"></div>
                <h4 class="font-bold text-red-600 uppercase text-xs mb-2">{note.title}</h4>
                <p class="text-xs font-bold text-slate-800 mb-2">{note.sub}</p>
                <p class="text-xs text-slate-600 leading-relaxed mb-2">{@html note.body}</p>
                {#if note.sign}
                    <p class="mt-3 text-[10px] font-bold text-slate-400 text-right">{note.sign}</p>
                {/if}
            </div>

        {:else}
            <!-- note: the workhorse - pin, heading, text, signature -->
            <div class="{PAPER} p-5 shadow-md" style="background:{note.paper}; rotate:{note.tilt}">
                <div class="w-3 h-3 rounded-full absolute -top-1.5 left-1/2 shadow-xs" style="background:{note.pin}"></div>
                <p class="font-bold underline mb-2 uppercase text-sm" style="color:{note.titleTone ?? '#1e293b'}">{note.title}</p>
                <p class="text-sm font-serif leading-relaxed text-slate-800">{@html note.body}</p>
                {#if note.sign}
                    <p class="mt-2 text-xs font-bold text-right">{note.sign}</p>
                {/if}
            </div>
        {/if}

    {/each}
</div>
