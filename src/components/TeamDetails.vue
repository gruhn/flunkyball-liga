<template>
	<div>
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
							<td>{{team.spiele_gewonnen | otherwise('?')}} von {{team.spiele_gespielt | otherwise('?')}}</td>
							<td>{{team.spiele_gewonnen_prozent | unit('%') | otherwise('-')}}</td>
							<td>{{team.rang_spiele_gewonnen_prozent || '-'}}</td>
						</tr>
						<tr>
							<th>Fouls pro Spiel</th>
							<td>{{team.fouls_insgesamt | otherwise('?')}} / {{team.spiele_gespielt | otherwise('?')}}</td>
							<td>{{team.quote_fouls_pro_spiel | number(2) | unit('Ø') | otherwise('-')}}</td>
							<td>{{team.rang_quote_fouls_pro_spiel | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>Runden bis Sieg <sup>1</sup></th>
							<td></td>
							<td>{{team.quote_runden_bis_sieg_mittel | number(2) | unit('Ø') | otherwise('-')}}</td>
							<td>{{team.rang_quote_runden_bis_sieg_mittel | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>Punkte bei Sieg <sup>2</sup></th>
							<td></td>
							<td>{{team.quote_punkte_bei_sieg_mittel | number(2) | unit('Ø') | otherwise('-')}}</td>
							<td>{{team.rang_quote_punkte_bei_sieg_mittel | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>SSP-Siege <sup>3</sup></th>
							<td>{{team.spiele_startauswahl_gewonnen | otherwise('?')}} von {{team.spiele_gespielt | otherwise('?')}}</td>
							<td>{{team.spiele_startauswahl_gewonnen_prozent | unit('%') | otherwise('-')}}</td>
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
</template>

<script>
import CircleImage from './CircleImage'
import { teamColor, teamLogo } from '../util'
import { getRecordByID } from '../vuex/getters'
import { loadTeamDetails } from '../vuex/actions'

export default {
	vuex : {
		getters : {
			get : getRecordByID('teams')
		},

		actions : {
			loadTeamDetails
		}
	},

	computed : {
		team () {
			return this.get(this.$route.params.id)
		}
	},

	watch : {
		'$route' ({params : {id : id}}) {
			this.loadTeamDetails(id)
		}
	},
	created () {
		this.loadTeamDetails(this.$route.params.id)
	},

	methods : {
		teamLogo, teamColor
	},

	components : {
		CircleImage
	}
}
</script>

<style scoped>
.circle-image {
	margin: 0px auto;
}
</style>
