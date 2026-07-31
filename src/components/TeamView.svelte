<!--
  The colleagues and how they feel about you.

  Reputation runs from -100 to +100; the bar shows it as a position around a
  centre line rather than a fill from the left.

  Müller is the player and gets no bar — you cannot have an opinion of yourself
  that the game tracks. He does get the reprimand stamp once the boss has issued
  a warning.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { DB } from '../data.js';

    // Ordered from best to worst; the first threshold that matches wins.
    const LEVELS = [
        { min:  90, text: 'KOMPLIZE',   bar: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]', tone: 'text-purple-400' },
        { min:  60, text: 'VERBÜNDET',  bar: 'bg-emerald-500',                                       tone: 'text-emerald-400' },
        { min:  20, text: 'FREUNDLICH', bar: 'bg-green-600',                                         tone: 'text-green-500' },
        { min: -19, text: 'NEUTRAL',    bar: 'bg-slate-500',                                         tone: 'text-slate-400' },
        { min: -59, text: 'SKEPTISCH',  bar: 'bg-yellow-600',                                        tone: 'text-yellow-600' },
        { min: -89, text: 'GENERVT',    bar: 'bg-orange-600',                                        tone: 'text-orange-500' },
        { min:-100, text: 'HASST DICH', bar: 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.6)]',     tone: 'text-red-500' }
    ];

    const isPlayer = (char) => char.name.includes('Müller') || char.role === 'SysAdmin';

    const team = $derived(
        DB.chars.map(char => {
            const player = isPlayer(char);
            const rep = player ? 0 : (state.reputation[char.name] ?? 0);
            return {
                char, player, rep,
                level: LEVELS.find(l => rep >= l.min) ?? LEVELS[3],
                // -100..100 mapped onto 0..100 so the centre line sits at 50%.
                fill: (rep + 100) / 2
            };
        })
    );
</script>

{#each team as member (member.char.name)}
    <div class="bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col gap-3 relative group hover:border-slate-500 transition-colors overflow-visible">

        {#if member.player && state.warningReceived}
            <div class="absolute top-2 right-2 md:right-4 transform rotate-12 pointer-events-none z-50">
                <span class="inline-block border-[3px] border-red-600 text-red-600 font-black text-lg md:text-xl tracking-widest uppercase px-2 py-0.5 rounded-sm opacity-90 shadow-md bg-slate-900/80 backdrop-blur-xs">
                    ABGEMAHNT
                </span>
            </div>
        {/if}

        <div class="flex gap-4 items-start z-10">
            <div class="shrink-0 bg-slate-900 w-16 h-16 flex items-center justify-center rounded-full border border-slate-600 overflow-hidden text-3xl shadow-inner
                        relative z-0 transition-transform duration-300 ease-out origin-center cursor-help
                        md:hover:scale-[2.25] md:hover:z-50 md:hover:shadow-2xl md:hover:border-white">
                {#if member.char.img}
                    <img src={member.char.img} loading="lazy" decoding="async" class="w-full h-full object-cover" alt={member.char.name}>
                {:else}{member.char.icon}{/if}
            </div>

            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-1">
                    <div class="flex flex-col">
                        <div class="flex items-baseline gap-2">
                            <h3 class="font-bold text-white text-lg truncate">{member.char.name}</h3>
                            <span class="text-[10px] text-slate-400 uppercase tracking-wider hidden md:inline-block pt-1">{member.char.role}</span>
                        </div>
                        <span class="text-[10px] text-slate-500 uppercase tracking-wider md:hidden">{member.char.role}</span>
                    </div>

                    {#if !member.player}
                        <span class="text-[10px] font-bold uppercase tracking-widest {member.level.tone} border border-slate-700 bg-slate-900/50 px-2 py-0.5 rounded-sm ml-2 shrink-0">
                            {member.level.text}
                        </span>
                    {/if}
                </div>

                {#if !member.player}
                    <div class="w-full h-1.5 bg-slate-900 rounded-full border border-slate-700 relative overflow-hidden mb-2">
                        <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600/50 z-20"></div>
                        <div class="h-full {member.level.bar} transition-all duration-1000 ease-out relative z-10" style="width: {member.fill}%"></div>
                    </div>
                {/if}

                <p class="text-xs text-slate-400 leading-snug opacity-90 italic">{member.char.desc}</p>
            </div>
        </div>
    </div>
{/each}
