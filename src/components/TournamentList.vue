<template>
	<div class="container">
		<div class="page-header">
			<h1>Turniere</h1>
		</div>

		<record-list :options="recordListOptions" :records="tournamentList" @record-click="handleRecordClick">
			<!--<router-view></router-view>-->
			<div v-if="tournament !== undefined">
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

		</record-list>
	</div>
</template>

<script>
import RecordList from './RecordList'
import moment from 'moment'
import orderBy from 'lodash/fp/orderBy'
//import deLocale from 'date-fns/format'
import { getTournaments } from '../vuex/getters'
import { loadTournaments, loadTournamentDetails } from '../vuex/actions'

export default {
	vuex : {
		getters : {
			tournamentList : getTournaments
		},

		actions : {
			loadTournaments,
			loadTournamentDetails
		}
	},

	data () {
		let self = this

		return {
			tournament : undefined,

			recordListOptions : {
				sortOptions : [
					{text : "Datum", field : "datum", order : 'desc', displayOrder : false},
					{text : "Titel", field : "titel", order : 'asc', displayOrder : false}
				],

				mapping : {
					text (record, sorting) {
						let text = ""

						text += record.titel +'<br>'
						text += '<small><time>'+ moment(record.datum).format('LL') +'</time></small>'

						return text
					}
				}
			}
		}
	},

	methods : {
		moment,

		//order : orderBy([], []),

		isStarterWinner ({starter_spieler_fertig : points}) {
			return points === 5
		},

		isGegnerWinner ({gegner_spieler_fertig : points}) {
			return points === 5
		},

		handleRecordClick (record) {
			this.tournament = record
			this.loadTournamentDetails(record['turnier_id'])
		}
	},

	created () {
		this.loadTournaments()
	},

	components : {
		RecordList
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
