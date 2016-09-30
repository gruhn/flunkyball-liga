<template>
	<div class="container">
		<div class="page-header">
			<h1>Turniere</h1>
		</div>


		<record-list :options="recordListOptions">
			<h2>
				{{tournament.titel}}
				<small class="text-nowrap">
					<time>{{tournament.datum | date}}</time>
				</small>
			</h2>

			<p>{{tournament.kommentar}}</p>

			<p><a href="{{tournament.facebook_event}}" target="_blank">zur Facebook-Veranstaltung</a></p>

			<div class="alert alert-warning" role="alert" ng-hide="tournament.gab_datenerfassung">
				Bei diesem Turnier fand keine Datenerfassung statt. Die erste erfolgreiche Datenerfassung war bei dem Turnier am 26. Juni 2015.
			</div>

			<div ng-show="tournament.gab_datenerfassung">

				<div ng-repeat="matchGroup in $ctrl.matchesGrouped | orderBy:'key'" class="panel panel-default">
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

export default {
	data () {
		return {
			tournament : undefined,
			matchesGrouped : [],

			recordListOptions : {
				loadingApiPath : 'turniere?pretty=0',
				displayIcon : false,

				sortOptions : [
					{text : "Datum", field : "datum", order : -1, displayOrder : false},
					{text : "Titel", field : "titel", order : 1, displayOrder : false}
				],

				mapping : {
					text : this.recordListItemTemplate
				}
			}
		}
	},

	events : {
		'record-list-click' (record) {
			this.$http.get('turniere/'+record.turnier_id+'?pretty=0').then(
				response => {
					this.tournament = response.data
				}
			)

			this.$http.get('turniere/'+record.turnier_id+'/spiele?pretty=0').then(
				response => {
					let matchGroups = {}

					response.data.forEach(item => {
						var phase = "P"+item.turnierphasen_index;
						if (item.turnierphase_id == 5)
							phase += item.gruppe + item.rueckspiel;

						if (matchGroups[phase] == undefined) {
							matchGroups[phase] = {};
							matchGroups[phase].matchList = [];
							matchGroups[phase].key = phase;

							if (item.turnierphase_id == 5) {
								matchGroups[phase].name = 'Gruppe ' + item.gruppe;

								if (item.rueckspiel > 1)
									matchGroups[phase].rueckrunde = "Rückrunde "+ item.rueckspiel;
								else if (item.rueckspiel === 1)
									matchGroups[phase].rueckrunde = "Rückrunde";
								else
									matchGroups[phase].rueckrunde = "";
							} else {
								matchGroups[phase].name = item.turnierphase;
								matchGroups[phase].rueckrunde = "";
							}

						}

						matchGroups[phase].matchList.push(item);
					})

					matchGroups.keys().forEach(item => {
						me.matchesGrouped.push(item);
					})
				}
			);
		}
	},

	methods : {
		recordListItemTemplate (record, sorting) {
			let text = ""

			text += record.titel +'<br>'
			text += '<small><time>'+ this.$eval('"'+ record.datum +'" | date') +'</time></small>'

			return text
		}
	},

	components : {
		RecordList
	}
}
</script>

<style scoped>

</style>
