<template>
	<div>
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
							<td>{{player.flunky_index | number(2) | otherwise('-')}}</td>
							<td>{{player.rang_flunky_index | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>Trefferquote <sup>2</sup></th>
							<td>{{player.anzahl_treffer | otherwise('?')}} von {{player.anzahl_wuerfe | otherwise('?')}}</td>
							<td>{{player.prozent_treffer | unit('%') | otherwise('-')}}</td>
							<td>{{player.rang_prozent_treffer | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>Trinkquote <sup>3</sup></th>
							<td></td>
							<td>{{player.quote_schluecke_mittel | number(2) | unit('Ø') | otherwise('-')}}</td>
							<td>{{player.rang_quote_schluecke_mittel | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>Spiele beendet</th>
							<td>{{player.anzahl_fertige_spiele | otherwise('?')}} von {{player.anzahl_spiele | otherwise('?')}}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<th>Bier getrunken</th>
							<td>{{player.anzahl_spiele * 0.5 | number(1) | otherwise('-')}} Liter</td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="panel panel-default">
			<div class="panel-heading">Entwicklung <small>Trinkquote</small></div>

			<div class="panel-body">
				<chart :data="player.schluecke"></chart>
			</div>

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
							<td>{{player.quote_schluecke_beste | number(0) | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>Arith. Mittel</th>
							<td>{{player.quote_schluecke_mittel | number(2) | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>Median</th>
							<td>{{player.quote_schluecke_median | number(1) | otherwise('-')}}</td>
						</tr>
						<tr>
							<th>Modus</th>
							<td>{{player.quote_schluecke_modus | number(0) | otherwise('-')}}</td>
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
</template>

<script>
import Chart from './Chart'
import { getRecordByID } from '../vuex/getters'
import { loadPlayerDetails } from '../vuex/actions'

export default {
	vuex : {
		getters : {
			get : getRecordByID('players')
		},

		actions : {
			loadPlayerDetails
		}
	},

	computed : {
		player () {
			return this.get(this.$route.params.id)
		}
	},

	watch : {
		'$route' ({params : {id : id}}) {
			this.loadPlayerDetails(id)
		}
	},
	created () {
		this.loadPlayerDetails(this.$route.params.id)
	},

	components : {
		Chart
	}
}
</script>

<style>
</style>
