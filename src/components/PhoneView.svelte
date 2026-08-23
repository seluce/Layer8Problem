<!--
  The phone.

  Covers the standby screen with its clock and notification as well as the chat
  app. The engine only appends to state.phone.messages and sets the current
  options; everything else follows from that.

  The container #smartphone keeps its own classes, because engine.updatePhone-
  Visibility() hides the whole phone when the "auto-hide" setting is on.
-->
<script>
    import { state, formatClock } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    import { t, tf, tree } from '../i18n/i18n.svelte.js';
    import { renderRecipe } from '../engine/recipe.js';
    const phone = $derived(state.phone);

    /*
     * A bubble carries a RECIPE, not a sentence - see engine/recipe.js. These
     * three resolve it on every paint, which is what makes an open chat follow
     * a language switch instead of standing there in the language it was
     * spoken in. The initial is derived from the resolved name rather than
     * stored, so it follows too.
     *
     * A recipe that will not resolve renders empty rather than throwing: a
     * chat with a blank bubble is odd, a chat that crashes is worse.
     */
    const text    = (msg) => renderRecipe(msg?.text) ?? '';
    const sender  = (msg) => renderRecipe(msg?.sender) ?? '';
    const initial = (msg) => (sender(msg).charAt(0) || '?').toUpperCase();

    const clock = $derived(formatClock(state.time));

    const hotkey = (index) => {
        if (!state.showHotkeys) return '';
        const key = [state.keyBinds.opt1, state.keyBinds.opt2, state.keyBinds.opt3, '4', '5', '6'][index] ?? '';
        return key.replace(/^Arrow/, '').toUpperCase();
    };

    const itemName = (id) => tree().items[id]?.name ?? id;

    /** Name of the item an option needs but the player does not have. */
    function missingItem(opt) {
        for (const field of ['req', 'rem']) {
            const id = opt[field];
            if (id && !state.inventory.find(i => i.id === id)) return itemName(id);
        }
        return null;
    }

    /** The item this option spends. Only rem consumes; req just has to be there. */
    const consumes = (opt) => (opt.rem ? itemName(opt.rem) : null);

    const options = $derived(
        (phone.options ?? []).map((opt, index) => ({
            opt, index,
            missing: missingItem(opt),
            consumes: missingItem(opt) ? null : consumes(opt),
            key: hotkey(index)
        }))
    );

    // The typing bubble is a message like any other, so the header status is
    // derived from the list rather than kept as a second flag.
    const isTyping = $derived((phone.messages ?? []).some(m => m.side === 'typing'));

    // Scrolls to the newest message.
    //
    // An attachment rather than bind:this plus $effect, because the $state rune
    // is not available in this file: Svelte reads `$name` as a store
    // subscription, and `state` is imported here, so `$state(...)` would compile
    // to a store access instead of a rune. Every component in this project
    // imports `state`, so the same applies to all of them.
    //
    // Reading messages.length is what makes the attachment re-run. The timeout
    // lets the browser lay out the new bubble first — without it scrollHeight is
    // still the previous value.
    const autoScroll = (node) => {
        phone.messages.length;
        const id = setTimeout(() => node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' }), 100);
        return () => clearTimeout(id);
    };
</script>

<div class="phone-notch shrink-0"><div class="w-12 h-1 bg-slate-600 rounded-full"></div></div>

{#if phone.open}
    <div class="flex-1 bg-slate-800 flex flex-col h-full overflow-hidden">
        <div class="bg-indigo-600 p-2 text-xs font-bold text-white flex justify-between shrink-0">
            <span>{phone.appName}</span>
            {#if isTyping}
                <span class="font-normal text-indigo-200 animate-pulse">{t('phone.typing')}</span>
            {/if}
        </div>

        <div {@attach autoScroll} class="flex-1 p-2 overflow-y-auto flex flex-col gap-2 min-h-0">
            {#each phone.messages as msg (msg.id)}
                {#if msg.side === 'in'}
                    <div class="w-full flex justify-start mb-4 chat-in-left">
                        <div class="flex items-end gap-2 max-w-[85%]">
                            <div class="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 overflow-hidden">
                                {#if msg.img}
                                    <!-- Contact photo. alt stays empty on purpose: the
                                         sender name is printed right above the bubble,
                                         repeating it would only double screen-reader
                                         output for a decorative image. -->
                                    <img src={msg.img} alt="" class="w-full h-full object-cover" />
                                {:else}
                                    {initial(msg)}
                                {/if}
                            </div>
                            <div class="flex flex-col">
                                <span class="text-[10px] text-slate-400 ml-1 mb-0.5">{sender(msg)}</span>
                                <div class="bg-slate-700 text-slate-100 px-4 py-2 rounded-2xl rounded-bl-none shadow-md text-sm leading-relaxed wrap-break-word">
                                    {text(msg)}
                                </div>
                            </div>
                        </div>
                    </div>
                {:else if msg.side === 'typing'}
                    <!-- Three bouncing dots while the other side "types". -->
                    <div class="w-full flex justify-start mb-2 chat-in-left">
                        <div class="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-none ml-10 flex items-center gap-1 h-10 w-16">
                            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                    </div>
                {:else if msg.side === 'system'}
                    <div class="w-full flex justify-center my-4 fade-in">
                        <div class="bg-slate-800/80 text-slate-400 px-3 py-1 rounded-full text-xs border border-slate-700 shadow-inner text-center max-w-[90%]">
                            {text(msg)}
                        </div>
                    </div>
                {:else if msg.side === 'error'}
                    <div class="text-center text-xs text-red-500 my-2">{text(msg)}</div>
                {:else}
                    <div class="w-full flex justify-end mb-4 chat-in-right">
                        <div class="max-w-[85%] flex flex-col items-end">
                            <div class="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-none shadow-md text-sm leading-relaxed wrap-break-word">
                                {text(msg)}
                            </div>
                            <span class="text-[10px] text-slate-500 mr-1 mt-0.5">{t('phone.read')}</span>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>

        <!-- Keeps the id: the keyboard shortcuts in engine.js find the reply
             buttons through it, and they also check its offsetParent to see
             whether the phone is on screen at all. -->
        <div id="app-actions" class="p-2 bg-slate-900 border-t border-slate-700 flex flex-col gap-2 shrink-0">
            {#each options as o (o.index)}
                <button class="w-full bg-slate-800 hover:bg-blue-600 text-blue-400 hover:text-white border border-slate-600 hover:border-blue-500 rounded-lg px-3 py-2 text-xs text-left transition-colors flex justify-between items-center group
                               {o.missing ? 'opacity-50 cursor-not-allowed' : ''}"
                        disabled={!!o.missing}
                        onclick={() => engine.handlePhoneChoice(o.opt.t, o.opt.next, o.opt.rem, o.index)}>
                    <div class="flex items-center gap-2 flex-1 mr-2">
                        {#if o.missing}
                            <img src="assets/img/ui/ui_locked.webp" alt={t('common.locked')}
                                 width="16" height="16" class="w-5 h-5 shrink-0 select-none"
                                 onerror={(e) => e.currentTarget.outerHTML = '🔒'}>
                        {:else}
                            <span class="opacity-50 group-hover:opacity-100 shrink-0">➤</span>
                        {/if}
                        <span class="wrap-break-word leading-tight py-1">{o.opt.t}</span>
                    </div>
                    <div class="shrink-0 flex items-center h-full gap-2">
                        {#if o.missing}
                            <span class="text-[10px]">{tf('phone.missing', { item: o.missing })}</span>
                        {:else}
                            {#if o.consumes}
                                <span class="text-[10px] font-normal text-amber-500/90 bg-amber-950/30 border border-amber-800/50 px-1.5 py-0.5 rounded-sm whitespace-nowrap">−{o.consumes}</span>
                            {/if}
                        {/if}
                        {#if !o.missing && o.key}
                            <kbd class="key-hint shrink-0">{o.key}</kbd>
                        {/if}
                    </div>
                </button>
            {/each}
        </div>
    </div>
{:else}
    <div class="flex-1 flex flex-col justify-center items-center bg-slate-900 text-white">
        <div class="text-5xl font-thin mb-2">{clock}</div>

        {#if phone.notification}
            <!-- The id is a hook for the global confirm key in engine.js.
                 A real button so the notification is reachable by keyboard;
                 the inner elements are spans because a button may only
                 contain phrasing content. -->
            <button type="button" id="phone-notification"
                 class="mt-6 bg-slate-800 p-3 rounded-xl w-3/4 flex items-center gap-3 border border-red-500 cursor-pointer animate-pulse text-left"
                 onclick={() => engine.openPhone()}>
                <img src="assets/img/ui/ui_message.webp" alt=""
                     width="28" height="28" class="w-7 h-7 shrink-0 select-none"
                     onerror={(e) => e.currentTarget.outerHTML = '📩'}>
                <span class="block">
                    <span class="block text-[10px] font-bold">{t('phone.newMessage')}</span>
                    <span class="block text-[9px]">{t('phone.readNow')}</span>
                </span>
            </button>
        {/if}
    </div>
{/if}
