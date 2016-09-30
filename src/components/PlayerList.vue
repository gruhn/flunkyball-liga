<template>
	<div class="container">
		<div class="page-header">
			<h1>Spieler</h1>
		</div>

		<record-list :options="recordListOptions" :records="recordListData">
			<!--<router-view></router-view>-->

			<div v-if="player !== undefined">
				<h2>{{player.name}} ({{player.mannschaft}})</h2>

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
									<th>FlunkYndex <sup>1</sup></th>
									<td></td>
									<td>{{player.flunky_index | number 2 | orElse '-'}}</td>
									<td>{{player.rang_flunky_index | orElse '-'}}</td>
								</tr>
								<tr>
									<th>Trefferquote <sup>2</sup></th>
									<td>{{player.anzahl_treffer +' von '+ player.anzahl_wuerfe}}</td>
									<td>{{player.prozent_treffer | unit '%' | orElse '-'}}</td>
									<td>{{player.rang_prozent_treffer | orElse '-'}}</td>
								</tr>
								<tr>
									<th>Trinkquote <sup>3</sup></th>
									<td></td>
									<td>{{player.quote_schluecke_mittel | number 2 | unit 'Ø' | orElse '-'}}</td>
									<td>{{player.rang_quote_schluecke_mittel | orElse '-'}}</td>
								</tr>
								<tr>
									<th>Spiele beendet</th>
									<td>{{player.anzahl_fertige_spiele +' von '+ player.anzahl_spiele}}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<th>Bier getrunken</th>
									<td>{{player.anzahl_spiele * 0.5}} Liter</td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">Details <small>Trinkquote</small></div>

					<div class="table-responsive">
						<table class="table">
							<thead>
								<tr>
									<th></th>
									<th class="text-center">Schlücke</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>Bestleistung</th>
									<td>{{player.quote_schluecke_beste | number 0 | orElse '-')}}</td>
								</tr>
								<tr>
									<th>Arithmetisches Mittel</th>
									<td>{{player.quote_schluecke_mittel | number 2 | orElse '-'}}</td>
								</tr>
								<tr>
									<th>Median</th>
									<td>{{player.quote_schluecke_median | number 1 | orElse '-'}}</td>
								</tr>
								<tr>
									<th>Modus (Modalwert)</th>
									<td>{{player.quote_schluecke_modus | number 0 | orElse '-'}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div>
					<p><small><sup>1</sup> Der FlunkYndex (gesprochen "Flunk-Index") ist ein Rating für Spieler, das aus der Anzahl gespielter Spiele, der Trink- und der Trefferquote berechnet wird. Der Wert liegt zwischen 0 und 10, wobei 10 das beste ist.</small></p>
					<p><small><sup>2</sup> Für Spieler mit weniger als fünf eingetragenen Würfen, kann keine repräsentative Statistik angegeben werden.</small></p>
					<p><small><sup>3</sup> Durchschnittliche Anzahl Schlücke pro Spiel. Alle Spiele werden mit einbezogen, in denen der Spieler fertig geworden ist, egal ob seine Mannschaft gewonnen hat oder nicht. Für Spieler mit weniger als drei beendeten Spielen, kann keine repräsentative Statistik angegeben werden.</small></p>
				</div>
			</div>

		</record-list>
	</div>
</template>

<script>
import RecordList from './RecordList'
import CircleImage from './CircleImage'
import { loadPlayers, loadPlayerDetails } from '../vuex/actions'
import { getPlayers } from '../vuex/getters'

export default {
	vuex : {
		getters : {
			getPlayers
		},

		actions : {
			loadPlayers,
			loadPlayerDetails
		}
	},

	data () {
		return {
			player : undefined,

			recordListOptions : {
				loadingApiPath : 'spieler?pretty=0',
				displayIcon : false,

				sortOptions : [
					{text : "Name", field : "name", order : 1, displayOrder : false},
					{text : "Mannschaft", field : "mannschaft", order : 1, displayOrder : false},
					{text : "Rang: FlunkYndex", field : "rang_flunky_index", order : 1, displayOrder : true},
					{text : "Rang: Trefferquote", field : "rang_prozent_treffer", order : 1, displayOrder : true},
					{text : "Rang: Trinkquote", field : "rang_quote_schluecke_mittel", order : 1, displayOrder : true}
				],

				mapping : {
					text (record, sorting) {
						let text = ""

						if (sorting.displayOrder)
							text += record[sorting.field] +'. '
						text += record.name +' ('+ record.mannschaft +')'

						return text
					}
				}
			}
		}
	},

	computed : {
		recordListData () {
			return this.getPlayers()
		}
	},

	events : {
		'record-list-click' (record) {
			this.player = record
			this.loadPlayerDetails(record['spieler_id'])
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

</style>
