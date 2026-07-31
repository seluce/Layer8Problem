export const tutorial = [

	// SCHRITT 1: Anruf
	{
		id: 'tut_call_1',
		type: 'calls',
		step: 1,
		title: 'Der Klassiker',
		text: 'Das Telefon klingelt schrill. Ein User beschwert sich lautstark, dass sein "Internet gelöscht" wurde, weil das blaue E auf dem Desktop fehlt. Dein Ticket-Zähler tickt gnadenlos weiter.',
		opts: [
			{
				t: 'Tief durchatmen und eine Verknüpfung anlegen.',
				m: 15, f: 5, a: 15, c: 0,
				r: 'Du hast wertvolle Lebenszeit verschwendet, aber das Ticket ist geschlossen. Die schiere Dummheit der Anfrage hat deinen Puls dennoch spürbar erhöht.'
			},
			{
				t: 'Ihm sagen, dass das Internet heute wegen Wartungsarbeiten geschlossen ist.',
				m: 5, f: 0, a: 30, c: 10,
				r: 'Der User ist verwirrt, aber ruhig. Das ging schnell! Dein Puls steigt jedoch massiv, da du weißt, dass diese Aussage Konsequenzen haben wird.'
			}
		]
	},
	
	// SCHRITT 2: Kaffee
	{
		id: 'tut_coffee_1',
		type: 'coffee',
		step: 4,
		title: 'Schwarzes Gold',
		text: 'Du stehst vor der Maschine im Pausenraum. Die Plörre riecht nach verbrannter Erde und Verzweiflung, aber es ist deine einzige Chance, den Puls wieder unter 180 zu kriegen.',
		opts: [
			{
				t: 'Augen zu und runter damit.',
				m: 5, f: 0, a: -15, c: 5,
				r: 'Dein Magen krampft kurz, aber die Mordlust gegenüber dem letzten Anrufer lässt spürbar nach. Das System registriert deine Abwesenheit.'
			},
			{
				t: 'Sich beim Trinken ausgiebig bei Kollegen beschweren.',
				m: 20, f: 15, a: -25, c: 0,
				r: 'Die spontane Therapie-Sitzung hat geholfen. Das System wertet diesen ausgedehnten Plausch allerdings als gepflegte Arbeitsverweigerung.'
			}
		]
	},

	// SCHRITT 3: Dienstgang
	{
		id: 'tut_sq_1',
		type: 'sidequest',
		step: 5,
		title: 'Die verlassene Küche',
		text: 'Du schleichst dich in die Teeküche. Jemand hat eine halbe Schachtel Donuts stehen lassen. Ein Kollege nähert sich.',
		opts: [
			{
				t: 'Schnell einen Donut greifen und verschwinden.',
				m: 5, f: 5, a: 0, c: 5,
				loot: 'donut', // <-- Garantiert den Donut
				r: 'Du hast dir einen Donut gesichert, wurdest aber leicht komisch angeschaut.'
			},
			{
				t: 'Den Kollegen in ein Gespräch verwickeln und unauffällig zugreifen.',
				m: 10, f: 10, a: 0, c: 0,
				loot: 'donut', // <-- Garantiert den Donut
				r: 'Das Gespräch war quälend langweilig, aber der Donut gehört dir!'
			}
		]
	},

	// SCHRITT 4: Serverraum
	{
		id: 'tut_srv_1',
		type: 'server',
		step: 6,
		title: 'Das Heiligtum',
		text: 'Die dicke Sicherheitstür fällt ins Schloss. Das konstante, laute Rauschen der Lüfter übertönt das Klagen der User. Es ist eiskalt, dunkel und absolut friedlich.',
		opts: [
			{
				t: 'Die heilige Ruhe genießen und atmen.',
				m: 15, f: 15, a: -20, c: 0,
				r: 'Du lehnst dich an ein 19-Zoll-Rack und spürst, wie dein Blutdruck sinkt. Die Entspannung ist herrlich, aber deine Faulheits-Metrik schießt nach oben.'
			},
			{
				t: 'In der Grabbelkiste nach Hardware wühlen.',
				m: 10, f: 0, a: 0, c: 0, loot: 'wifi_note',
				r: 'Du findest einen abgegriffenen WLAN-Zettel. Könnte nützlich sein, um später andere Abteilungen zu bestechen.'
			}
		]
	}
];
