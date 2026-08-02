<!--
  Chantals Feel-Good Hub, vormals public/assets/intranet/chantal.html.

  The top post follows the average reputation across the team. Between the
  thresholds of the team view (+20 / -20) the ordinary post stays where it is -
  Chantal only writes about you when there is something to celebrate or
  something to hint at.

  The paragraphs carry <strong> and <em> and go through {@html}. They are
  authored in data_intranet.js, never player input.
-->
<script>
    import { state as game } from '../../engine/engine_state.svelte.js';

    const post = $derived(game.intranetData?.chantal ?? null);
</script>

<div class="max-w-3xl mx-auto mt-12 px-4 pb-12 space-y-8">

    <div class="text-center mb-12">
        <div class="inline-block bg-slate-800 p-4 rounded-full shadow-lg border border-slate-700 mb-4 text-4xl">🧘‍♀️</div>
        <h1 class="text-4xl font-black text-pink-400 mb-2 tracking-tight">Mindful Workspace</h1>
        <p class="text-pink-300/70 font-medium">Dein digitaler Safe-Space für agile Achtsamkeit.</p>
    </div>

    {#if post}
        <div class="bg-slate-800 p-8 rounded-2xl shadow-md border border-slate-700 relative">
            <div class="absolute -left-3 top-8 w-6 h-6 bg-pink-500 rounded-full border-4 border-slate-900"></div>
            <h2 class="text-2xl font-bold text-white mb-2">{post.title}</h2>
            <div class="text-xs text-pink-400/80 font-bold uppercase tracking-wider mb-6">{post.time}</div>

            <div class="space-y-4 text-slate-300 leading-relaxed">
                {#each post.paragraphs as text, i (i)}
                    <p>{@html text}</p>
                {/each}
                <p class="font-bold text-pink-400 mt-6">In tiefer Verbundenheit zu euren KPIs,<br>Eure Chantal 💕</p>
            </div>
        </div>
    {/if}

    <div class="bg-slate-800 p-8 rounded-2xl shadow-md border border-slate-700 relative {post ? 'opacity-80' : ''}">
        <div class="absolute -left-3 top-8 w-6 h-6 {post ? 'bg-slate-600' : 'bg-pink-500'} rounded-full border-4 border-slate-900"></div>
        <h2 class="text-2xl font-bold text-white mb-2">Burnout ist nur ein Framing-Problem! ✨</h2>
        <div class="text-xs {post ? 'text-slate-400' : 'text-pink-400/80'} font-bold uppercase tracking-wider mb-6">{post ? 'Gepostet gestern' : 'Gepostet heute, 09:15'}</div>

        <div class="space-y-4 text-slate-300 leading-relaxed">
            <p>Namaste ihr wundervollen Leistungsträger! 🙏</p>
            <p>Ich höre in letzter Zeit oft das Wort "Stress" im Büro. Bitte streicht dieses Wort aus eurem Vokabular! Ab sofort nennen wir es "Intensive Wachstumschance". Wenn ihr das Gefühl habt, ihr könnt nicht mehr, atmet einfach tief in euer Wurzelchakra und lächelt euren Monitor an.</p>
            <p><strong>Neuerfindung des Obstkorbs:</strong> Da die Äpfel immer so schnell weg waren, haben wir das Konzept "gamifiziert". Das Obst ist jetzt im Büro versteckt! Wer eine Birne findet, darf sie behalten (bitte im Intranet eintragen wg. geldwertem Vorteil).</p>
            <p class="font-bold text-pink-400 mt-6">In tiefer Verbundenheit zu euren KPIs,<br>Eure Chantal 💕</p>
        </div>
    </div>

    <div class="bg-slate-800 p-8 rounded-2xl shadow-md border border-slate-700 relative opacity-80">
        <div class="absolute -left-3 top-8 w-6 h-6 bg-slate-600 rounded-full border-4 border-slate-900"></div>
        <h2 class="text-2xl font-bold text-white mb-2">Die Kraft der stummen Meetings 🤫</h2>
        <div class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">Gepostet vor 3 Wochen</div>

        <div class="space-y-4 text-slate-300 leading-relaxed">
            <p>Guten Morgen Corporate-Family!</p>
            <p>Unser Pilotprojekt "Silent Sync" war ein riesiger Erfolg. Gestern haben sich 12 Mitarbeiter aus Sales und Marketing für eine Stunde in Konferenzraum B getroffen, ohne ein einziges Wort zu wechseln. Wir haben ausschließlich über telepathische Mind-Maps und energetische Präsenz kommuniziert.</p>
            <p>Das Ergebnis war atemberaubend: Niemand hat sich gestritten, es gab keine sinnlosen Fragen und die Aura im Raum war extrem agil. Wir rollen dieses Format ab sofort für alle Quartalsberichte aus.</p>
            <p>Denkt daran: Wer schweigt, stimmt zu!</p>
        </div>
    </div>

</div>
