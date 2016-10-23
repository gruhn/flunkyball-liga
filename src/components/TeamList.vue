<template>
	<div class="container">
		<div class="page-header">
			<h1>Mannschaften</h1>
		</div>

		<record-menu :options="recordListOptions" :records="teamList"></record-menu>
	</div>
</template>

<script>
import RecordMenu from './RecordMenu'
import CircleImage from './CircleImage'
import { getRecords } from '../vuex/getters'
import { loadTeams, loadTeamDetails } from '../vuex/actions'
import { teamLogo, teamColor } from '../util'

export default {
	vuex : {
		getters : {
			teamList : getRecords('teams')
		},

		actions : {
			loadTeams,
			loadTeamDetails
		}
	},

	data () {
		let self = this

		return {
			recordListOptions : {
				sortOptions : [
					{text : "Name", field : "name", order : 'asc', displayOrder : false},
					{text : "Rang: Spiele gewonnen", field : "rang_spiele_gewonnen_prozent", order : 'asc', displayOrder : true},
					{text : "Rang: Fouls pro Spiel", field : "rang_quote_fouls_pro_spiel", order : 'asc', displayOrder : true},
					{text : "Rang: Runden bis Sieg", field : "rang_quote_runden_bis_sieg_mittel", order : 'asc', displayOrder : true},
					{text : "Rang: Punkte bei Sieg", field : "rang_quote_punkte_bei_sieg_mittel", order : 'asc', displayOrder : true}
				],

				isAnyActive () {
					return self.$route.name === 'team' 
				},

				mapping : {
					text (record, sorting) {
						let text = ""

						if (sorting.displayOrder)
							text += record[sorting.field] +". "
						text += record.name

						return text
					},

					route ({mannschaft_id : id}) {
						return {name: 'team', params: {id: id}}
					},

					iconUrl (record) {
						return self.teamLogo(record)
					},

					iconBg (record) {
						return self.teamColor(record)
					}
				}
			}
		}
	},

	created () {
		this.loadTeams()
	},

	methods : {
		teamColor, teamLogo
	},

	components : {
		RecordMenu, CircleImage
	}
}
</script>

<style>
.circle-image {
	margin-right: 10px;
}
</style>
