<!--
  Das GlobalCorp-Intranet.

  Until v4.0.0 this was seven standalone HTML files in public/assets/intranet/,
  shown in an iframe. That construction needed a hand-copied Tailwind build at
  public/assets/css/style.css to style a document the bundler never saw - and
  the moment that copy went stale, the pages rendered as bare markup. It did.

  As components the pages share the game's one stylesheet, the text size works
  through rem like everywhere else, and the compiler checks them. The browser
  window around them is a prop: the tab, the address bar and the close button
  belong to this component, the pages know nothing about them.

  The address bar shows the URL of the current page, which the iframe never
  managed - it always displayed the start address.

  CAUTION: `state` is imported as `game` on purpose. Importing the binding
  under its own name shadows the $state rune, and this component needs the
  rune for the current page. See STRUCTURE.md.
-->
<script>
    import { state as game } from '../../engine/engine_state.svelte.js';
    import { engine } from '../../engine.js';

    import IntranetDashboard from './IntranetDashboard.svelte';
    import IntranetChantal from './IntranetChantal.svelte';
    import IntranetVision from './IntranetVision.svelte';
    import IntranetSales from './IntranetSales.svelte';
    import IntranetKantine from './IntranetKantine.svelte';
    import IntranetHR from './IntranetHR.svelte';
    import IntranetImpressum from './IntranetImpressum.svelte';

    // The accent colours are written out as whole class names so the Tailwind
    // scanner finds them in this file. Never assemble them from parts.
    const PAGES = [
        { id: 'dashboard', label: 'Dashboard',     accent: 'text-blue-400',    nav: true,
          url: 'https://hub.globalcorp.internal/',                 view: IntranetDashboard },
        { id: 'chantal',   label: 'Feel-Good Hub', accent: 'text-pink-400',    nav: true,
          url: 'https://hub.globalcorp.internal/mindful/',         view: IntranetChantal },
        { id: 'vision',    label: 'Vision',        accent: 'text-emerald-400', nav: true,
          url: 'https://hub.globalcorp.internal/vision/interview', view: IntranetVision },
        { id: 'sales',     label: 'Sales',         accent: 'text-amber-400',   nav: true,
          url: 'https://hub.globalcorp.internal/sales/deals',      view: IntranetSales },
        { id: 'kantine',   label: 'Kantine',       accent: 'text-red-400',     nav: true,
          url: 'https://hub.globalcorp.internal/food-synergies',   view: IntranetKantine },
        { id: 'hr',        label: 'Human Capital', accent: 'text-purple-400',  nav: true,
          url: 'https://hub.globalcorp.internal/human-capital/',   view: IntranetHR },
        // Reachable through the footer only, exactly as before.
        { id: 'impressum', label: 'Impressum',     accent: 'text-slate-400',   nav: false,
          url: 'https://hub.globalcorp.internal/legal/impressum',  view: IntranetImpressum }
    ];

    let pageId = $state('dashboard');

    const current = $derived(PAGES.find(p => p.id === pageId) ?? PAGES[0]);
    // Capitalised, because Svelte 5 renders any component-valued variable
    // directly - <svelte:component> is gone.
    const CurrentPage = $derived(current.view);

    // Every visit starts on the dashboard. The iframe did this by resetting
    // its src; here the component survives closing, so it has to be said.
    $effect(() => {
        if (game.intranetOpen) pageId = 'dashboard';
    });
</script>

{#if game.intranetOpen}
    <div class="fixed inset-0 bg-black/90 z-1200 flex items-center justify-center p-2 md:p-8">

        <div class="bg-slate-900 w-[95vw] max-w-[1400px] h-[95vh] flex flex-col rounded-lg shadow-2xl overflow-hidden ring-1 ring-slate-700">

            <!-- Browser chrome: tab, address bar, close button -->
            <div class="bg-slate-950 pr-2 pl-4 py-2 flex items-center border-b border-slate-800 shrink-0 select-none">

                <div class="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 rounded-t-md flex items-center gap-2 border-t border-x border-slate-700 mt-2 min-w-[150px]">
                    <span>🌍</span> GlobalCorp Hub
                </div>

                <div class="flex-1 max-w-xl mx-4 mt-2 hidden md:block">
                    <div class="bg-slate-800 text-slate-400 text-xs font-mono py-1.5 px-4 rounded-full border border-slate-700 flex items-center gap-2 justify-center shadow-inner">
                        <span>🔒</span>
                        <span class="text-slate-300">{current.url}</span>
                    </div>
                </div>

                <div class="ml-auto mt-2">
                    <button type="button" onclick={() => engine.closeIntranet()}
                            aria-label="Intranet schließen"
                            class="text-slate-400 hover:bg-red-600 hover:text-white px-3 py-1 rounded-sm transition-colors flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- The page itself. Scrolls inside the window, not with the game. -->
            <div class="flex-1 overflow-y-auto bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">

                <nav class="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 shadow-xs">
                    <div class="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between items-center gap-4">

                        <div class="flex items-center gap-2 shrink-0">
                            <span class="text-2xl">🌍</span>
                            <span class="font-black text-xl tracking-tight text-slate-100">Global<span class="text-blue-500">Corp</span></span>
                        </div>

                        <div class="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-2 text-sm font-semibold text-slate-400">
                            {#each PAGES.filter(p => p.nav) as p (p.id)}
                                <button type="button" onclick={() => (pageId = p.id)}
                                        class="hover:text-slate-200 transition-colors {p.accent} {pageId === p.id ? 'underline decoration-2 underline-offset-4' : ''}">
                                    {p.label}
                                </button>
                            {/each}
                        </div>

                    </div>
                </nav>

                <CurrentPage />

                <footer class="max-w-6xl mx-auto mt-12 mb-6 px-4 text-center border-t border-slate-800 pt-6">
                    <button type="button" onclick={() => (pageId = 'impressum')}
                            class="text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest font-bold">
                        Rechtliche Hinweise &amp; Impressum
                    </button>
                </footer>

            </div>

        </div>
    </div>
{/if}
