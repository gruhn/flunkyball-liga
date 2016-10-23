<template>
	<div class="container">
		<div class="page-header">
			<h1>Turniere</h1>
		</div>

		<record-menu :options="recordListOptions" :records="tournamentList"></record-menu>
	</div>
</template>

<script>
import RecordMenu from './RecordMenu'
import moment from 'moment'
import orderBy from 'lodash/fp/orderBy'
import { getRecords } from '../vuex/getters'
import { loadTournaments } from '../vuex/actions'

export default {
	vuex : {
		getters : {
			tournamentList : getRecords('tournaments')
		},

		actions : {
			loadTournaments
		}
	},

	data () {
		let self = this

		return {
			recordListOptions : {
				sortOptions : [
					{text : "Datum", field : "datum", order : 'desc', displayOrder : false},
					{text : "Titel", field : "titel", order : 'asc', displayOrder : false}
				],

				isAnyActive () {
					return self.$route.name === 'tournament'
				},

				mapping : {
					text (record, sorting) {
						let text = ""

						text += record.titel +'<br>'
						text += '<small><time>'+ moment(record.datum).format('LL') +'</time></small>'

						return text
					},

					route ({turnier_id : id}) {
						return {name : 'tournament', params : {id : id}}
					}
				}
			}
		}
	},

	created () {
		this.loadTournaments()
	},

	components : {
		RecordMenu
	}
}
</script>

<style scoped>
</style>
