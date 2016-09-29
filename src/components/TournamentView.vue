<template>
	<div class="container">
		<div class="page-header">
			<h1>Turniere</h1>
		</div>


		<record-list :options="recordListOptions">

		</record-list>

		<!--<div class="row">
			<div class="col-xs-12 col-sm-4" v-bind:class="{'hidden-xs' : $ctrl.isAnyActive}">

				<list :items="" :item-tempate=""></list>

						<span>
							{{record.titel}}<br>
							<small>
								<time>{{record.datum | date : 'dd. MMMM yyyy'}}</time>
							</small>
						</span>

						<span class="glyphicon glyphicon-menu-right text-right"></span>

			</div>

			<div class="col-xs-12 col-sm-8" v-show="$ctrl.isAnyActive">

				<h2>
					{{$ctrl.details.titel}}
					<small class="text-nowrap">
						<time>{{$ctrl.details.datum | date : 'dd. MMMM yyyy'}}</time>
					</small>
				</h2>

				<p>{{$ctrl.details.kommentar}}</p>

				<p><a href="{{$ctrl.details.facebook_event}}" target="_blank">zur Facebook-Veranstaltung</a></p>

				<div class="alert alert-warning" role="alert" ng-hide="$ctrl.details.gab_datenerfassung">
					Bei diesem Turnier fand keine Datenerfassung statt. Die erste erfolgreiche Datenerfassung war bei dem Turnier am 26. Juni 2015.
				</div>

				<div ng-show="$ctrl.details.gab_datenerfassung">

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
			</div>
		</div>-->
	</div>
</template>

<script>
import RecordList from './RecordList'

export default {
	data () {
		return {
			tournament : undefined,

			recordListOptions : {
				loadingApiPath : 'turniere?pretty=0',
				displayIcon : false,

				sortOptions : [
					{text : "Datum", field : "datum", displayOrder : false},
					{text : "Titel", field : "titel", displayOrder : false}
				],

				mapping : {
					text (record, sorting) {
						let text = ""

						text += record.titel +'<br>'
						text += '<small><time>'+ record.datum /*| date : 'dd. MMMM yyyy'*/ +'</time></small>'

						return text
					}
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
		}
	},

	components : {
		RecordList
	}
}
</script>

<style scoped>

</style>
