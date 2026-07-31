<!--
  The tutorial pointer: a speech bubble anchored to whatever element the
  current step highlights.

  Positioning stays in tutorial.js. It measures the target with
  getBoundingClientRect() and writes left/top directly, which is exactly the
  kind of work that has to happen against the real DOM — Svelte has no idea
  where an element ended up on screen.

  What this component owns is the markup and the content. The ids stay because
  updatePosition() addresses them.

  `desc` may contain markup from the tutorial data, hence {@html}. It is
  authored text, never player input.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { tutorial } from '../tutorial.js';

    const tip = $derived(state.tutorialPointer);
</script>

<div id="tut-pointer"
     class="fixed z-3000 flex-col pointer-events-auto transition-opacity duration-300 w-[280px] max-w-[90vw]
            {tip.visible ? 'flex' : 'hidden'} {tip.faded ? 'opacity-0' : ''}">
    <div class="bg-slate-900 border border-cyan-500 p-4 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] text-white text-center relative pointer-events-auto z-10">
        <h4 id="tut-pointer-title" class="font-black text-cyan-400 mb-1 uppercase tracking-widest text-xs">{tip.title}</h4>
        <p id="tut-pointer-desc" class="text-xs text-slate-300 leading-relaxed pointer-events-auto">
            {@html tip.desc}

            {#if tip.confirmable}
                <!-- Info steps have nothing to click on the board, so they carry
                     their own way onward. -->
                <span class="block mt-4 border-t border-cyan-800 pt-3 pointer-events-auto">
                    <span onclick={() => tutorial.advance()}
                          class="cursor-pointer w-full bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-700 rounded-lg py-2 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors">
                        <span>▶</span> Verstanden
                    </span>
                </span>
            {/if}
        </p>
    </div>
    <div id="tut-arrow" class="w-4 h-4 bg-slate-900 absolute rotate-45 border-cyan-500 z-0 shadow-[0_0_10px_rgba(6,182,212,0.2)]"></div>
</div>
