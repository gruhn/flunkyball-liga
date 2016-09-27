<template>
	<div class="team-logo center-block" style="{{$ctrl.fact.teamLogo($ctrl.fact.selected)}}"></div>

	<h2>{{$ctrl.fact.selected.name}}</h2>

	<h3>Statistik</h3>

	<div class="panel panel-default">
		<div class="panel-heading">Übersicht</div>

		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th></th>
						<th><span class="sr-only">Werte</span></th>
						<th><span class="sr-only">Quote</span></th>
						<th><span class="glyphicon-podium"></span></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Spiele gewonnen</th>
						<td>{{$ctrl.fact.selected.spiele_gewonnen +' von '+ $ctrl.fact.selected.spiele_gespielt}}</td>
						<td>{{$ctrl.fact.selected.spiele_gewonnen_prozent +'%'}}</td>
						<td>{{$ctrl.fact.selected.rang_spiele_gewonnen_prozent}}</td>
					</tr>
					<tr>
						<th>Fouls pro Spiel</th>
						<td>{{$ctrl.fact.selected.fouls_insgesamt +' / '+ $ctrl.fact.selected.spiele_gespielt}}</td>
						<td>{{'Ø '+ ($ctrl.fact.selected.quote_fouls_pro_spiel | number: 2)}}</td>
						<td>{{$ctrl.fact.selected.rang_quote_fouls_pro_spiel}}</td>
					</tr>
					<tr>
						<th>Runden bis Sieg <sup>1</sup></th>
						<td></td>
						<td>{{$ctrl.fact.selected.quote_runden_bis_sieg_mittel ? ('Ø '+ ($ctrl.fact.selected.quote_runden_bis_sieg_mittel | number: 2)) : '-'}}</td>
						<td>{{$ctrl.fact.selected.rang_quote_runden_bis_sieg_mittel || '-'}}</td>
					</tr>
					<tr>
						<th>Punkte bei Sieg <sup>2</sup></th>
						<td></td>
						<td>{{$ctrl.fact.selected.quote_punkte_bei_sieg_mittel ? ('Ø '+ ($ctrl.fact.selected.quote_punkte_bei_sieg_mittel | number: 2)) : '-'}}</td>
						<td>{{$ctrl.fact.selected.rang_quote_punkte_bei_sieg_mittel || '-'}}</td>
					</tr>
					<tr>
						<th>SSP-Siege <sup>3</sup></th>
						<td>{{$ctrl.fact.selected.spiele_startauswahl_gewonnen +' von '+ $ctrl.fact.selected.spiele_gespielt}}</td>
						<td>{{$ctrl.fact.selected.spiele_startauswahl_gewonnen_prozent +'%'}}</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="small">
		<p><sup>1</sup> Die Anzahl Spielrunden, die eine Mannschaft braucht, um zu gewinnen.</p>
		<p><sup>2</sup> Punkte entsprechen der Anzahl Spieler, die am Ende eines Spiels in der gegnerischen Mannschaft noch übrig sind.</p>
		<p><sup>3</sup> Wie oft die Mannschaft bei der Startauswahl gewinnt. Die Startauswahl wird durch Schere-Stein-Papier (SSP) entschieden.</p>
	</div>
</template>

<script>
export default {
	methods : {
		logo (team) {
			if (team.hat_logo)
				return {'background-image' : 'url("../assets/team-logos/'+ team.mannschaft_id +'.png"'}
			else // ..
				return {'background-color' : 'hsl('+((team.mannschaft_id * 30) % 361)+', 50%, 80%)'}
		},

		isAnySelected () {return false} // TEMP!
	},

	created () {
		this.loadRecords()
	},

	data () {
		return {
			listOptions : {
				filterable : true,

				sortOptions : [
					{label : "Name", field : "name"},
					{label : "Rang: Spiele gewonnen", field : "rang_spiele_gewonnen_prozent"},
					{label : "Rang: Fouls pro Spiel", field : "rang_quote_fouls_pro_spiel"},
					{label : "Rang: Runden bis Sieg", field : "rang_quote_runden_bis_sieg_mittel"},
					{label : "Rang: Punkte bei Sieg", field : "rang_quote_punkte_bei_sieg_mittel"}
				],

				itemLabelTemplate (rank, team, sorting) { // ...
					if (sorting.field === 'name')
						return team.name
					else
						return (rank+1) +'. '+ team.name
				},

				itemIconStyling : this.logo
			},

			records : []
		}
	}
}
</script>

<style>
</style>
