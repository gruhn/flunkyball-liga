<template>
	<div class="container">
		<div class="page-header">
			<h1>Mannschaften</h1>
		</div>

		<div class="row">
			<div class="col-xs-12 col-sm-4" :class="{'hidden-xs' : isAnySelected()}">

				<filter-form :options="filterOptions" :filter.sync="filterString" :sorting.sync="sorting"></filter-form>

				<div class="list-group">
					<a  v-for="(index, record) in records | filterBy filterString | orderBy sorting.field"
						href="record.link"
						:class="{'active' : isSelected(record)}"
						class="list-group-item">

						<team-logo :team="record" size="32"></team-logo>
						<span>{{rank(index)}} {{record.name}}</span>
						<span class="glyphicon glyphicon-menu-right text-right"></span>
					</a>
				</div>

			</div>
			<div class="col-xs-12 col-sm-8" v-if="isAnySelected()">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import FilterForm from './FilterForm'
import TeamLogo from './TeamLogo'

export default {
	methods : {
		loadRecords () {
			this.$http.get('mannschaften?pretty=0').then(response => {
				this.records = response.data
			})
		},

		logo (team) {
			if (team.hat_logo)
				return {'background-image' : 'url("../assets/team-logos/'+ team.mannschaft_id +'.png"'}
			else // ..
				return {'background-color' : 'hsl('+((team.mannschaft_id * 30) % 361)+', 50%, 80%)'}
		},

		pad (number, size) {
		    let str = number + "";

		    while (str.length < size)
				str = "0" + str;

		    return str;
		},

		rank (index) {
			if (this.sorting.field === 'name') {
				return ""
			} else {
				let maxRankDigits = this.records.length.toString().length
				return this.pad(index+1, maxRankDigits) + "."
			}
		},

		isAnySelected () {return false} // TEMP!
	},

	created () {
		this.loadRecords()
	},

	data () {
		return {
			filterString : "",
			sorting : undefined,
			filterOptions : {
				filterable : true,
				sortOptions : [
					{text : "Name", field : "name"},
					{text : "Rang: Spiele gewonnen", field : "rang_spiele_gewonnen_prozent"},
					{text : "Rang: Fouls pro Spiel", field : "rang_quote_fouls_pro_spiel"},
					{text : "Rang: Runden bis Sieg", field : "rang_quote_runden_bis_sieg_mittel"},
					{text : "Rang: Punkte bei Sieg", field : "rang_quote_punkte_bei_sieg_mittel"}
				],
			},

			records : []
		}
	},

	components : {
		FilterForm, TeamLogo
	}
}
</script>

<style>
.list-group-item {
	display: flex;
	align-items: center;
}
.list-group-item > .glyphicon-menu-right {
	flex-grow: 1;
}
</style>
