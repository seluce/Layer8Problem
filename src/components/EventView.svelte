<!--
  An event screen: header, text, optional portrait, option buttons.

  Covers every event type — ordinary actions, reputation encounters, boss
  fights, the party and chain nodes. They only differ in styling and in whether
  the boss timer bar is shown.

  The options are real buttons with real handlers again. Serialising them into
  an inline onclick needed hand-written escaping for the HTML parser and the JS
  parser at once, which is what broke the INSIDER party ending; the data-opt
  delegation was the workaround for that. Neither is needed here.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { DB } from '../data.js';

    const STYLES = {
        calls:     { name: 'ANRUF',         color: 'text-blue-400',    border: 'border-blue-500',    icon: '📞', bg: 'bg-slate-900' },
        boss:      { name: 'NOTFALL',       color: 'text-red-500',     border: 'border-red-500',     icon: '🚨', bg: 'bg-slate-900' },
        rep:       { name: 'BEGEGNUNG',     color: 'text-yellow-300',  border: 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]', icon: '📖', bg: 'bg-linear-to-b from-slate-900 to-slate-950' },
        sidequest: { name: 'DIENSTGANG',    color: 'text-purple-400',  border: 'border-purple-500',  icon: '🎲', bg: 'bg-slate-900' },
        server:    { name: 'SERVERRAUM',    color: 'text-emerald-400', border: 'border-emerald-500', icon: '💾', bg: 'bg-slate-900' },
        coffee:    { name: 'KAFFEE',        color: 'text-amber-400',   border: 'border-amber-500',   icon: '☕', bg: 'bg-slate-900' },
        party:     { name: 'SYNERGY-GALA',  color: 'text-pink-400',    border: 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]',  icon: '🎉', bg: 'bg-linear-to-b from-slate-900 to-slate-950' },
        special:   { name: 'MITTAGSPAUSE',  color: 'text-teal-400',    border: 'border-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.2)]',  icon: '🍽️', bg: 'bg-slate-900' }
    };
    const FALLBACK = { name: 'SYSTEM', color: 'text-amber-400', border: 'border-amber-500', icon: '⚡', bg: 'bg-slate-900' };

    const EXCUSE_TYPES = ['coffee', 'server', 'sidequest', 'calls', 'rep'];
    const STRESSBALL_COOLDOWN = 60;

    const ev    = $derived(state.terminal.event ?? {});
    const style = $derived(STYLES[ev.type] ?? FALLBACK);

    // \n in the data files means a paragraph break in the prose.
    const paragraphs = $derived((ev.text ?? '').split('\n'));

    const portrait = $derived(
        ev.charName ? DB.chars?.find(c => c.name === ev.charName) ?? null : null
    );

    const showExcuse = $derived(
        EXCUSE_TYPES.includes(ev.type)
        && state.excusesLeft > 0
        && !(typeof tutorial !== 'undefined' && tutorial.isActive)
    );

    // Hotkeys 1-3 are rebindable, 4-6 are fixed (party stations).
    const hotkey = (index) => {
        if (!state.showHotkeys) return '';
        const key = [state.keyBinds.opt1, state.keyBinds.opt2, state.keyBinds.opt3, '4', '5', '6'][index] ?? '';
        return key.replace(/^Arrow/, '').toUpperCase();
    };

    /** Why an option cannot be taken, or null when it can. */
    function lockReason(opt) {
        if (opt.req) {
            const owned = state.inventory.find(i => i.id === opt.req && !i.used);
            if (!owned) return `(Fehlt: ${DB.items[opt.req]?.name ?? opt.req})`;
            if (opt.req === 'stressball' && state.time - state.lastStressballTime < STRESSBALL_COOLDOWN) return '(Cooldown)';
        }
        if (opt.rem && !state.inventory.find(i => i.id === opt.rem)) {
            return `(Benötigt: ${DB.items[opt.rem]?.name ?? opt.rem})`;
        }
        if (opt.checkPool) {
            const left = (DB.party ?? []).filter(e => e.loc === opt.checkPool && !state.usedIDs.has(e.id));
            if (left.length === 0) return '(Alles gesehen)';
        }
        return null;
    }

    const options = $derived(
        (ev.opts ?? []).map((opt, index) => {
            const locked = lockReason(opt);
            return {
                opt, index, locked,
                // A chain option pointing at another node continues the
                // conversation; one pointing at a result ends it.
                continues: ev.isChain && !locked && opt.next && !opt.next.startsWith('res_'),
                key: hotkey(index)
            };
        })
    );

    const LOCKED_CLASS = 'w-full text-left p-2.5 rounded-sm border border-red-900 bg-slate-950 text-slate-600 cursor-not-allowed flex justify-between items-center opacity-70';
    const OPEN_CLASS   = 'w-full text-left p-2.5 rounded-sm border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-slate-400 hover:text-white transition-all text-slate-200 font-bold shadow-md flex justify-between items-center group';
</script>

<div class="w-full max-w-2xl text-left fade-in {style.bg} border {style.border} p-4 md:p-6 rounded-xl shadow-2xl mx-auto my-auto shrink-0">

    <div class="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-600 pb-3 md:pb-4">
        <span class="text-3xl shrink-0">{style.icon}</span>
        <div class="flex flex-col min-w-0">
            <span class="{style.color} font-black uppercase tracking-widest text-sm wrap-break-word">{style.name}</span>
            <h2 class="text-xl md:text-2xl font-bold text-slate-100 wrap-break-word">{ev.title}</h2>
        </div>
    </div>

    {#if ev.type === 'boss'}
        <div class="w-full h-4 bg-red-950/50 rounded-full mb-6 border border-red-500/30 overflow-hidden relative">
            <!-- Width comes from state so the timer never has to find this element. -->
            <div class="h-full ease-linear shadow-red-500/50 shadow-md
                        {state.bossBarPercent < 30 ? 'bg-red-600 animate-pulse' : 'bg-linear-to-r from-red-600 to-red-500'}"
                 style="width: {state.bossBarPercent}%"></div>
        </div>
    {/if}

    <div class="flex gap-4 md:gap-6 items-center mb-8">
        <div class="flex-1 bg-black/40 p-5 rounded-lg border-l-4 {style.border} shadow-inner">
            <p class="italic text-slate-300 text-lg leading-relaxed font-serif">"{#each paragraphs as line, i}{#if i > 0}<br>{/if}{line}{/each}"</p>
        </div>

        {#if portrait}
            <div class="hidden sm:flex shrink-0 w-28 h-28 md:w-32 md:h-32 bg-slate-900 border border-slate-600 rounded-xl shadow-lg overflow-hidden items-center justify-center">
                {#if portrait.img}
                    <img src={portrait.img} class="w-full h-full object-cover scale-110" alt={portrait.name}>
                {:else}
                    <div class="w-full h-full flex items-center justify-center text-5xl bg-slate-800/50">{portrait.icon}</div>
                {/if}
            </div>
        {/if}
    </div>

    <div class="space-y-2.5">
        {#each options as o (o.index)}
            <button class={o.locked ? LOCKED_CLASS : OPEN_CLASS}
                    disabled={!!o.locked}
                    onclick={() => engine.chooseOption(o.opt)}>
                <div class="flex items-center flex-1 mr-2 min-w-0">
                    <span class="mr-3 text-xl shrink-0">
                        {#if o.locked}🔒{:else}<span class="{style.color} group-hover:text-white transition-colors">➤</span>{/if}
                    </span>
                    <span class="text-left wrap-break-word py-1">
                        {o.opt.t}
                        {#if o.locked}<span class="text-sm text-red-500 font-normal ml-2">{o.locked}</span>{/if}
                    </span>
                </div>
                <div class="shrink-0 flex items-center h-full">
                    {#if o.continues}
                        <span class="text-xs text-blue-400 bg-blue-900/20 border border-blue-900/50 px-2 py-1 rounded-sm ml-3 font-mono">...</span>
                    {/if}
                    {#if o.key}
                        <kbd class="shrink-0 text-[9px] bg-slate-900 border border-slate-600 px-1.5 py-0.5 rounded-sm text-slate-400 font-mono shadow-inner group-hover:text-white transition-colors ml-2">{o.key}</kbd>
                    {/if}
                </div>
            </button>
        {/each}

        {#if showExcuse}
            <div class="mt-5 w-full flex justify-end border-t border-slate-800 pt-4">
                <button onclick={() => engine.openExcuseModal()}
                        class="px-3 py-2 bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all flex items-center gap-2">
                    <span>Ausrede nutzen ({state.excusesLeft} übrig)</span>
                </button>
            </div>
        {/if}
    </div>
</div>
