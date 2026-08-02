<!--
  Die Wall of Deals, vormals public/assets/intranet/sales.html.

  Same five deals as before, but as data rather than five copies of the same
  card - which is what the next step needs, when the wall starts reacting to
  Markus' reputation and to deals the player saved or lost today.

  The badge classes are written out in full so the Tailwind scanner finds
  them. Never assembled from parts.
-->
<script>
    const DEALS = [
        {
            icon: '🤝',
            customer: 'MegaCorp Industries',
            badge: 'Vertrag unterzeichnet',
            badgeClass: 'bg-amber-900/30 text-amber-400 border border-amber-800',
            product: 'Prädiktive Blockchain-Infrastruktur',
            rows: [
                { label: 'Vertraglich zugesichert:', text: 'Das System erkennt Serverausfälle 24 Stunden bevor sie passieren und repariert die Hardware durch maschinelles Lernen selbstständig.' },
                { label: 'Rollout:', text: 'Ende des Monats. Der Kunde erwartet den Login-Link am Freitag.' }
            ]
        },
        {
            icon: '📦',
            customer: 'Global Logistics',
            badge: 'Live',
            badgeClass: 'bg-emerald-900/30 text-emerald-400 border border-emerald-800',
            product: 'Pre-Crime Delivery AI',
            rows: [
                { label: 'Vertraglich zugesichert:', text: 'Die Software weiß, was der Endkunde bestellt, bevor er überhaupt daran denkt, und leitet den Versandprozess proaktiv ein.' },
                { label: `Markus' Erfolgsnotiz:`, text: `"Hab dem Kunden gesagt, unser Algorithmus liest Gehirnströme. Wir schicken einfach zufällig Pakete an irgendwelche Adressen und nennen es 'Proaktive Synergie'. Der Vorstand hat es geliebt!"` }
            ]
        },
        {
            icon: '🛡️',
            customer: 'Local Bank Ltd.',
            badge: 'SLA Aktiv',
            badgeClass: 'bg-amber-900/30 text-amber-400 border border-amber-800',
            product: '100% Unhackbarer Offline-Cloud-Speicher',
            rows: [
                { label: 'Vertraglich zugesichert:', text: 'Die Daten des Kunden sind weltweit per App in Echtzeit abrufbar, liegen aber physisch getrennt vom Internet in einem Vakuum.' },
                { label: 'Kundennotiz:', text: `Der CIO der Bank war begeistert von Markus' Konzept des 'Wireless-Kabels'.` }
            ]
        },
        {
            icon: '📠',
            customer: 'Bundesamt für Digitalisierung',
            badge: 'Pilotprojekt',
            badgeClass: 'bg-blue-900/30 text-blue-400 border border-blue-800',
            product: 'Fax-to-Blockchain Bridge',
            rows: [
                { label: 'Vertraglich zugesichert:', text: 'Herkömmliche Faxgeräte der Behörde werden durch ein Firmware-Update nativ mit der Krypto-Cloud verbunden. Stempel werden als NFTs gespeichert.' },
                { label: `Markus' Erfolgsnotiz:`, text: `"Das war der leichteste Pitch des Jahres. Die Behörde wollte unbedingt 'was mit Krypto' machen. Wir drucken einfach QR-Codes aus."` }
            ]
        },
        {
            icon: '📉',
            customer: 'Startup XYZ',
            badge: 'Proof of Concept',
            badgeClass: 'bg-slate-700 text-slate-400 border border-slate-600',
            product: 'Agile Legacy-Integration',
            dim: true,
            rows: [
                { label: 'Vertraglich zugesichert:', text: 'Unsere Cloud-Software ist nativ abwärtskompatibel zu MS-DOS 6.22.' },
                { label: 'Status:', text: 'Warten auf Freigabe. Der Kunde sucht derzeit noch nach einem 5,25-Zoll-Diskettenlaufwerk für die Installation.' }
            ]
        }
    ];
</script>

<div class="max-w-5xl mx-auto mt-8 px-4 pb-12">
    <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
        <div>
            <h1 class="text-3xl font-black mb-2 text-white">🏆 Wall of Deals</h1>
            <p class="text-slate-400">Erfolgreich abgeschlossene Deals. Was unser Sales-Team für GlobalCorp gesichert hat.</p>
        </div>
        <div class="text-left md:text-right bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-md">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Team-Leader</p>
            <p class="font-bold text-amber-500">Markus (Senior VP of Synergies)</p>
        </div>
    </div>

    <div class="space-y-6">
        {#each DEALS as deal (deal.customer)}
            <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md flex flex-col md:flex-row gap-6 {deal.dim ? 'opacity-75' : ''}">
                <div class="flex flex-col justify-center shrink-0">
                    <span class="text-5xl">{deal.icon}</span>
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h3 class="font-bold text-xl text-white">Kunde: {deal.customer}</h3>
                        <span class="{deal.badgeClass} text-xs font-bold px-2 py-0.5 rounded-sm uppercase">{deal.badge}</span>
                    </div>
                    <p class="text-slate-300 mb-4 font-medium text-lg border-b border-slate-700 pb-4">Verkauftes Produkt: "{deal.product}"</p>
                    <div class="text-sm text-slate-400 space-y-2">
                        {#each deal.rows as row (row.label)}
                            <p><span class="font-bold text-slate-300">{row.label}</span> {row.text}</p>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
