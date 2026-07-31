<!--
  The big centre modal: end of day, game over, warnings.

  Theme and button come from the title. That is how it always worked — the
  callers pass a headline like "FEIERABEND" or "RAGE QUIT" and nothing else —
  so the rules are kept, just as a table instead of an if-chain.

  `text` is assembled by the engine and contains the day report with its stat
  pills, hence {@html}. It never carries player input.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    const modal = $derived(state.modal);

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
</script>

{#if modal.open}
    <!-- Keeps the id: the keyboard handlers in engine.js find the confirm
         button through #modal-content. -->
    <div id="modal-content" class="max-w-xl w-full bg-slate-900 border-2 {theme.border} p-8 rounded-xl text-center shadow-2xl max-h-[90vh] overflow-y-auto">
        <h1 class="text-4xl font-black {theme.title} mb-4">{modal.title}</h1>
        <div class="text-lg text-slate-300 mb-8 italic">{@html modal.text}</div>
        <button onclick={() => isFinal ? location.reload() : engine.closeModal()}
                class="bg-white text-black px-8 py-3 rounded-sm font-bold uppercase hover:bg-slate-200 shadow-lg">
            {isFinal ? 'NEUSTART' : 'VERSTANDEN'}
        </button>
    </div>
{/if}
