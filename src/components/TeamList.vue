<template>
	<div class="container">
		<div class="page-header">
			<h1>Mannschaften</h1>
		</div>

		<record-list :options="recordListOptions">
			<!--<router-view></router-view>-->

			<div v-if="team !== undefined" class="team-details">
				<circle-image :src="teamLogo(team)" :color="teamColor(team)" size="160"></circle-image>

				<h2>{{team.name}}</h2>

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
									<td>{{team.spiele_gewonnen +' von '+ team.spiele_gespielt}}</td>
									<td>{{team.spiele_gewonnen_prozent | unit '%'}}</td>
									<td>{{team.rang_spiele_gewonnen_prozent}}</td>
								</tr>
								<tr>
									<th>Fouls pro Spiel</th>
									<td>{{team.fouls_insgesamt +' / '+ team.spiele_gespielt}}</td>
									<td>{{team.quote_fouls_pro_spiel | number 2 | unit 'Ø' | orElse '-'}}</td>
									<td>{{team.rang_quote_fouls_pro_spiel}}</td>
								</tr>
								<tr>
									<th>Runden bis Sieg <sup>1</sup></th>
									<td></td>
									<td>{{team.quote_runden_bis_sieg_mittel | number 2 | unit 'Ø' | orElse '-'}}</td>
									<td>{{team.rang_quote_runden_bis_sieg_mittel | orElse '-'}}</td>
								</tr>
								<tr>
									<th>Punkte bei Sieg <sup>2</sup></th>
									<td></td>
									<td>{{team.quote_punkte_bei_sieg_mittel | number 2 | unit 'Ø' | orElse '-'}}</td>
									<td>{{team.rang_quote_punkte_bei_sieg_mittel || '-'}}</td>
								</tr>
								<tr>
									<th>SSP-Siege <sup>3</sup></th>
									<td>{{team.spiele_startauswahl_gewonnen +' von '+ team.spiele_gespielt}}</td>
									<td>{{team.spiele_startauswahl_gewonnen_prozent | unit '%' | orElse '-'}}</td>
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
			</div>

		</record-list>
	</div>
</template>

<script>
import RecordList from './RecordList'
import CircleImage from './CircleImage'

export default {
	data () {
		return {
			team : undefined,

			recordListOptions : {
				loadingApiPath : 'mannschaften?pretty=0',
				displayIcon : true,

				sortOptions : [
					{text : "Name", field : "name", order : 1, displayOrder : false},
					{text : "Rang: Spiele gewonnen", field : "rang_spiele_gewonnen_prozent", order : 1, displayOrder : true},
					{text : "Rang: Fouls pro Spiel", field : "rang_quote_fouls_pro_spiel", order : 1, displayOrder : true},
					{text : "Rang: Runden bis Sieg", field : "rang_quote_runden_bis_sieg_mittel", order : 1, displayOrder : true},
					{text : "Rang: Punkte bei Sieg", field : "rang_quote_punkte_bei_sieg_mittel", order : 1, displayOrder : true}
				],

				mapping : {
					text (record, sorting) {
						let text = ""

						if (sorting.displayOrder)
							text += record[sorting.field] +". "
						text += record.name

						return text
					},

					iconUrl : this.teamLogo,
					iconBg : this.teamColor
				}
			}
		}
	},

	events : {
		'record-list-click' (record) {
			this.$http.get('mannschaften/'+record.mannschaft_id+'?pretty=0').then(
				response => {
					this.team = response.data
				}
			)
		}
	},

	methods : {
		teamLogo (team) {
			if (team.hat_logo)
				return '../assets/team-logos/'+ team.mannschaft_id +'.png'
			else
				return '../assets/no-logo.png'
		},

		teamColor (team) {
			return 'hsl('+((team.mannschaft_id * 30) % 361)+', 50%, 80%)'
		}
	},

	components : {
		RecordList, CircleImage
	}
}
</script>

<style>
.circle-image {
	margin-right: 10px;
}

.team-details .circle-image {
	margin: 0px auto;
}
</style>
