<template>
	<div class="container">
		<div class="page-header">
			<h1>Spieler</h1>
		</div>

		<record-menu :options="recordListOptions" :records="playerList"></record-menu>
	</div>
</template>

<script>
import RecordMenu from './RecordMenu'
import { loadPlayers } from '../vuex/actions'
import { getRecords } from '../vuex/getters'

export default {
	vuex : {
		getters : {
			playerList : getRecords('players')
		},

		actions : {
			loadPlayers
		}
	},

	data () {
		let self = this

		return {
			recordListOptions : {
				sortOptions : [
					{text : "Name", field : "name", order : 'asc', displayOrder : false},
					{text : "Mannschaft", field : "mannschaft", order : 'asc', displayOrder : false},
					{text : "Rang: FlunkYndex", field : "rang_flunky_index", order : 'asc', displayOrder : true},
					{text : "Rang: Trefferquote", field : "rang_prozent_treffer", order : 'asc', displayOrder : true},
					{text : "Rang: Trinkquote", field : "rang_quote_schluecke_mittel", order : 'asc', displayOrder : true}
				],

				isAnyActive () {
					return self.$route.name === 'player' 
				},

				mapping : {
					text (record, sorting) {
						let text = ""

						if (sorting.displayOrder)
							text += record[sorting.field] +'. '
						text += record.name +' ('+ record.mannschaft +')'

						return text
					},

					route ({spieler_id : id}) {
						return {name: 'player', params: {id: id}}
					}
				}
			}
		}
	},

	created () {
		this.loadPlayers()
	},

	methods : {
		handleRecordClick ({spieler_id : id}) {
			this.$router.push({name : 'player', params : {id : id}})
		}
	},

	components : {
		RecordMenu
	}
}
</script>

<style>
</style>
