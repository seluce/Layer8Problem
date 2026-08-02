<!--
  Human Capital, vormals public/assets/intranet/hr.html.

  The login is the same one as before: the credentials are broadcast over the
  news ticker, and the file behind it belongs to Schnösel. Müller's own file
  comes in the next step - GlobalCorp hands out one password for every
  account and has never changed it, which is what makes a second file
  reachable at all.

  The login state lives in the component, so leaving the page and coming back
  asks again. That is the same behaviour the old page had, where switching
  pages meant a full document load.
-->
<script>
    const ACCOUNTS = {
        j_schnoesel: 'Synergy2026!'
    };

    let user = $state('');
    let pass = $state('');
    let failed = $state(false);
    let loggedIn = $state(false);

    function attemptLogin() {
        const name = user.trim().toLowerCase();
        if (ACCOUNTS[name] && ACCOUNTS[name] === pass.trim()) {
            loggedIn = true;
            failed = false;
        } else {
            failed = true;
            pass = '';
        }
    }

    function logout() {
        user = '';
        pass = '';
        failed = false;
        loggedIn = false;
    }

    // Enter submits, as on any login form. No <form> element: the game runs in
    // one document and a stray submit would reload it.
    function onKey(e) {
        if (e.key === 'Enter') attemptLogin();
    }
</script>

<div class="max-w-4xl mx-auto mt-8 px-4">

    {#if !loggedIn}
        <div class="max-w-md mx-auto mt-20">
            <div class="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl relative overflow-hidden">
                <h2 class="text-2xl font-bold text-white mb-2">Restricted Access</h2>
                <p class="text-sm text-slate-400 mb-6 border-b border-slate-700 pb-4">Bitte authentifizieren Sie sich, um auf Personalakten zuzugreifen.</p>

                <div class="space-y-4">
                    <div>
                        <label for="hr-user" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Benutzerkennung</label>
                        <input type="text" id="hr-user" bind:value={user} onkeydown={onKey} autocomplete="off"
                               class="w-full bg-slate-900 border border-slate-600 rounded-sm p-3 text-slate-200 outline-hidden focus:border-purple-500 transition-colors">
                    </div>
                    <div>
                        <label for="hr-pass" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Passwort</label>
                        <input type="password" id="hr-pass" bind:value={pass} onkeydown={onKey} autocomplete="off"
                               class="w-full bg-slate-900 border border-slate-600 rounded-sm p-3 text-slate-200 outline-hidden focus:border-purple-500 transition-colors">
                    </div>
                    <p class="text-red-500 text-xs font-bold h-4 transition-opacity {failed ? '' : 'opacity-0'}">Zugriff verweigert.</p>
                    <button type="button" onclick={attemptLogin}
                            class="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-sm transition-colors mt-2">LOGIN</button>
                </div>
            </div>
        </div>
    {:else}
        <div class="mt-8">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-black text-white tracking-tight">Mitarbeiterakte <span class="text-purple-500">#8472-B</span></h1>
                <button type="button" onclick={logout}
                        class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 border border-slate-600 rounded-sm transition-colors">Abmelden</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div class="md:col-span-1 space-y-6">
                    <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md flex flex-col items-center text-center">
                        <div class="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-slate-600">👤</div>
                        <h2 class="font-bold text-xl text-white">J.-A. Schnösel</h2>
                        <p class="text-purple-400 font-bold text-sm mb-2">Junior Agile Synergy Facilitator</p>
                        <span class="bg-amber-900/40 text-amber-400 border border-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Status: Probezeit (Monat 1/14)</span>
                    </div>

                    <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                        <h3 class="font-bold mb-3 text-white border-b border-slate-700 pb-2">Stammdaten</h3>
                        <ul class="space-y-3 text-sm text-slate-300">
                            <li><span class="block text-xs text-slate-500 uppercase">Vereinbartes Gehalt</span>
                            <span class="font-mono text-amber-400">2.411,00 € Brutto / Monat</span><br>
                            <span class="text-[10px] text-slate-500">(40-Stunden-Woche. Zzgl. bis zu 80 unvergütete Pflicht-Überstunden pro Monat)</span></li>
                            <li><span class="block text-xs text-slate-500 uppercase mt-2">Wohnort</span>
                            Hinterwald-Süd 4<br>17398 Nirgendwo</li>
                            <li><span class="block text-xs text-slate-500 uppercase mt-2">Pendelzeit</span>
                            <span class="text-red-400">3h 15min (einfache Strecke)</span></li>
                            <li><span class="block text-xs text-slate-500 uppercase mt-2">Urlaubsanspruch</span>
                            14 Tage / Jahr</li>
                        </ul>
                    </div>
                </div>

                <div class="md:col-span-2 space-y-6">
                    <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                        <h3 class="font-bold mb-4 text-white flex items-center gap-2">
                            <span class="text-amber-500">📁</span> Persönliche Dokumente
                        </h3>

                        <div class="space-y-3">
                            <details class="group bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                                <summary class="px-4 py-3 cursor-pointer font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex justify-between items-center">
                                    <span class="flex items-center gap-2"><span class="text-xl">📄</span> Motivationsschreiben.pdf</span>
                                    <span class="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div class="p-4 border-t border-slate-700 text-sm text-slate-400 italic space-y-3 bg-slate-950/50">
                                    <p>"Sehr geehrtes Human Capital Komitee der GlobalCorp,</p>
                                    <p>mit brennender Leidenschaft für cross-funktionale Synergien und einem unerschütterlichen Glauben an die transformative Kraft agiler Workflows bewerbe ich mich hiermit um die Position in Ihrem Hause.</p>
                                    <p>Mein Ziel ist es, in Ihrem Unternehmen echte Disruption voranzutreiben. Ich möchte veraltete Paradigmen shiften, isolierte Datensilos aufbrechen und durch proaktives Mindset-Engineering nachhaltige, skalierbare Wertschöpfungsketten implementieren. In meiner vorherigen Tätigkeit (als Assistant Shift Manager bei einer großen Fast-Food-Kette) konnte ich bereits beweisen, dass ich komplexe Supply-Chain-Probleme unter Hochdruck gamifizieren kann.</p>
                                    <p>Ein Privatleben betrachte ich als unmonetarisiertes Zeitfenster. Ich bin jederzeit bereit, mein gesamtes geistiges und physisches Kapital zu 100% für die globale Mission von GlobalCorp zu investieren."</p>
                                </div>
                            </details>

                            <details class="group bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                                <summary class="px-4 py-3 cursor-pointer font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex justify-between items-center">
                                    <span class="flex items-center gap-2"><span class="text-xl">📑</span> Offizielle_Arbeitsanweisung_v4.pdf</span>
                                    <span class="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div class="p-4 border-t border-slate-700 text-sm text-slate-300 space-y-4 bg-slate-950/50">
                                    <p class="font-bold text-red-400 uppercase text-xs">Vertraulich: Kernaufgabenbeschrieb (Level 1)</p>
                                    <p class="text-xs text-slate-400 mb-2">Die Aufgaben des 'Junior Agile Synergy Facilitator' umfassen bis auf Widerruf folgende manuelle Prozesse:</p>
                                    <ul class="list-decimal pl-5 space-y-3">
                                        <li><strong>Kaffeefilter-Optimierung:</strong> Um das Nachhaltigkeits-Budget zu schonen, sind benutzte Kaffeefilter der Abteilung Sales auf der Heizung im 2. Stock zu trocknen, auszuklopfen und für den Wiedergebrauch bereitzulegen.</li>
                                        <li><strong>Physisches Pingen:</strong> Fällt der Teams-Status eines Mitarbeiters im Großraumbüro länger als 45 Sekunden auf "Abwesend", ist dieser umgehend aufzusuchen und mit einem normierten Holzstock (Länge: 1,20m) an der Schulter anzutippen, um die Agilität zu reaktivieren.</li>
                                        <li><strong>Pflanzen-Synergie:</strong> Die Plastikpflanzen im Eingangsbereich sind zweimal wöchentlich mit Leitungswasser zu gießen. Dies dient der Aufrechterhaltung der Illusion eines organisch wachsenden Unternehmens für eintreffende Investoren.</li>
                                        <li><strong>Akustische Archivierung:</strong> Da das Diktiergerät der Abteilungsleitung defekt ist, muss der Mitarbeiter bei strategischen Meetings anwesend sein und sämtliche gesprochenen Vokale in Echtzeit mitzählen. Die Summe ist freitags als Excel-Tabelle einzureichen.</li>
                                    </ul>
                                </div>
                            </details>
                        </div>
                    </div>

                    <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                        <h3 class="font-bold mb-4 text-white flex items-center gap-2">
                            <span class="text-emerald-500">📊</span> Verhaltensanalyse &amp; Arbeitsweise
                        </h3>
                        <ul class="space-y-4 text-sm text-slate-300">
                            <li class="flex gap-3">
                                <span class="text-red-500 mt-1">■</span>
                                <div>
                                    <strong class="text-slate-200 block">Visueller Produktivitätsverlust</strong>
                                    Mitarbeiter blinzelt im Durchschnitt 18 Mal pro Minute. Das summiert sich auf 2,4 verlorene Arbeitsstunden im Jahr. Eine offizielle Abmahnung ist in Vorbereitung.
                                </div>
                            </li>
                            <li class="flex gap-3">
                                <span class="text-amber-500 mt-1">■</span>
                                <div>
                                    <strong class="text-slate-200 block">Mangelnde Resilienz (Vorfall 01-A)</strong>
                                    Wurde am ersten Tag weinend unter dem Schreibtisch gefunden, nachdem ihm aufgetragen wurde, das Internet für das Wochenend-Archiv auszudrucken.
                                </div>
                            </li>
                            <li class="flex gap-3">
                                <span class="text-red-500 mt-1">■</span>
                                <div>
                                    <strong class="text-slate-200 block">Toiletten-Inkonsistenz</strong>
                                    Die durchschnittliche Verweildauer in der Sanitäranlage beträgt 4 Minuten und 12 Sekunden. Die GlobalCorp-Norm liegt bei 2 Minuten und 30 Sekunden. Der Zugangscode wird ab morgen nur noch auf Antrag herausgegeben.
                                </div>
                            </li>
                            <li class="flex gap-3">
                                <span class="text-emerald-500 mt-1">■</span>
                                <div>
                                    <strong class="text-slate-200 block">Loyalitäts-Metrik (Positiv)</strong>
                                    Hat seinen privaten Streaming-Account erfolgreich gekündigt, um sich abends fokussierter auf unbezahlte Überstunden vorbereiten zu können. Dies wurde mit einem virtuellen High-Five im Intranet belohnt.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    {/if}
</div>
