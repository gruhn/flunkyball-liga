<template>
	<div class="container">
		<div class="page-header">
			<h1>Turniere</h1>
		</div>

		<record-list :options="recordListOptions" :records="tournamentList" @record-click="handleRecordClick">
			<!--<router-view></router-view>-->

			<h2>
				{{tournament.titel}}
				<small class="text-nowrap">
					<time>{{tournament.datum | date}}</time>
				</small>
			</h2>

			<p>{{tournament.kommentar}}</p>

			<p><a :href="tournament.facebook_event" target="_blank">zur Facebook-Veranstaltung</a></p>

			<div class="alert alert-warning" role="alert" ng-hide="tournament.gab_datenerfassung">
				Bei diesem Turnier fand keine Datenerfassung statt. Die erste erfolgreiche Datenerfassung war bei dem Turnier am 26. Juni 2015.
			</div>

			<div ng-show="tournament.gab_datenerfassung">

				<div ng-repeat="matchGroup in $ctrl.matchesGrouped" class="panel panel-default">
					<div class="panel-heading">
						{{matchGroup.name}} <small>{{matchGroup.rueckrunde}}</small>
					</div>

					<div class="table-responsive">
						<table class="table">
							<thead class="sr-only">
								<th>Start-Mannschaft</th>
								<th>Punkte</th>
								<th>Gegner-Mannschaft</th>
							</thead>
							<tbody>
								<tr ng-repeat="match in matchGroup.matchList">
									<td ng-class="{'info' : $ctrl.isStarterWinner(match)}" class="text-center">{{match.starter_name}}</td>
									<td class="text-center">
										{{match.starter_spieler_fertig}} : {{match.gegner_spieler_fertig}}
									</td>
									<td ng-class="{'info' : $ctrl.isGegnerWinner(match)}" class="text-center">{{match.gegner_name}}</td>
								</tr>
							</tbody>
						</table>
					</div>

				</div>

			</div>
		</record-list>
	</div>
</template>

<script>
import RecordList from './RecordList'
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
		return {
			tournament : undefined,
			matchesGrouped : [],

			recordListOptions : {
				sortOptions : [
					{text : "Datum", field : "datum", order : 'desc', displayOrder : false},
					{text : "Titel", field : "titel", order : 'asc', displayOrder : false}
				],

				mapping : {
					text (record, sorting) {
						let text = ""

						text += record.titel +'<br>'
						text += '<small><time>'+ record.datum +'</time></small>'

						return text
					}
				}
			}
		}
	},

	methods : {
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
</style>
