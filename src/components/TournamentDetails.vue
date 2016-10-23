<template>
	<div>
		<h2>
			{{tournament.titel}}
			<small class="text-nowrap">
				<time>{{moment(tournament.datum).format('LL')}}</time>
			</small>
		</h2>

		<p>{{tournament.kommentar}}</p>

		<p><a :href="tournament.facebook_event" target="_blank">zur Facebook-Veranstaltung</a></p>

		<div class="alert alert-warning" role="alert" v-show="!tournament.gab_datenerfassung">
			Bei diesem Turnier fand keine Datenerfassung statt. Die erste erfolgreiche Datenerfassung war bei dem Turnier am 26. Juni 2015.
		</div>

		<div ng-show="tournament.gab_datenerfassung">

			<div v-for="phase in tournament.phasen" class="panel panel-default">
				<div class="panel-heading">
					{{phase.name}} <small>{{phase.rueckrunde}}</small>
				</div>

				<div class="table-responsive">
					<table class="table">
						<thead class="sr-only">
							<th>Start-Mannschaft</th>
							<th>Punkte</th>
							<th>Gegner-Mannschaft</th>
						</thead>
						<tbody>
							<tr v-for="spiel in phase.spiele">
								<td :class="{'info' : isStarterWinner(spiel)}" class="match-team">{{spiel.starter_name}}</td>
								<td class="match-points">
									{{spiel.starter_spieler_fertig}} : {{spiel.gegner_spieler_fertig}}
								</td>
								<td :class="{'info' : isGegnerWinner(spiel)}" class="match-team">{{spiel.gegner_name}}</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
import moment from 'moment'
import orderBy from 'lodash/fp/orderBy'
import { getRecordByID } from '../vuex/getters'
import { loadTournamentDetails } from '../vuex/actions'

export default {
	vuex : {
		getters : {
			get : getRecordByID('tournaments')
		},

		actions : {
			loadTournamentDetails
		}
	},

	computed : {
		tournament () {
			return this.get(this.$route.params.id)
		}
	},

	watch : {
		'$route' ({params : {id : id}}) {
			this.loadTournamentDetails(id)
		}
	},
	created () {
		this.loadTournamentDetails(this.$route.params.id)
	},

	methods : {
		moment,

		//order : orderBy([], []),

		isStarterWinner ({starter_spieler_fertig : points}) {
			return points === 5
		},

		isGegnerWinner ({gegner_spieler_fertig : points}) {
			return points === 5
		}

	}
}
</script>

<style scoped>
.match-team, .match-points {
	text-align: center;
}
.match-team {
	width: 45%;
}
.match-points {
	width: 10%;
	min-width: 30px;
}
</style>
