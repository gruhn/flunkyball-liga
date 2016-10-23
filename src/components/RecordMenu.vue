<template>
	<div class="row">
		<aside class="col-xs-12 col-sm-4" :class="{'hidden-xs' : options.isAnyActive()}">

			<div class="form-group has-feedback" v-if="filterable">
				<label>Suchen</label>
				<input
					v-model="filter"
					type="text"
					class="form-control input-sm">
				<span class="glyphicon glyphicon-search form-control-feedback"></span>
			</div>

			<div class="form-group" v-if="sortable">
				<label>Sortieren nach</label>
				<select
					v-model="sorting"
					type="text"
					class="form-control input-sm">

					<option v-for="option in options.sortOptions" :value="option">{{option.text}}</option>

				</select>
			</div>

			<div class="list-group">
				<router-link
					:to="options.mapping.route(record)"
					class="list-group-item"
					active-class="active"
					v-for="(record, index) in filteredRecords"
					exact
				>
					<circle-image
						v-if="displayIcon"
						:src="options.mapping.iconUrl(record)"
						:color="options.mapping.iconBg(record)"
						size="32"
					></circle-image>
					<div class="record-text" v-html="options.mapping.text(record, sorting)"></div>
					<div class="glyphicon glyphicon-menu-right text-right"></div>
				</router-link>
			</div>
		</aside>

		<div class="col-xs-12 col-sm-8">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import CircleImage from './CircleImage'
import filter from 'lodash/fp/filter'
import flow from 'lodash/fp/flow'
import orderBy from 'lodash/fp/orderBy'
import reject from 'lodash/fp/reject'
import isString from 'lodash/isString'
import includes from 'lodash/includes'
import some from 'lodash/fp/some'

export default {
	props : {
		options : {},
		records : {
			type : Array,
			default : _ => []
		}
	},

	data () {
		return {
			filter : "",
			sorting : this.options.sortOptions[0],
		}
	},

	computed : {
		filterable () {
			return this.records.length > 20
		},

		displayIcon () {
			return this.options.mapping.iconUrl !== undefined
				&& this.options.mapping.iconBg !== undefined
		},

		sortable () {
			return this.options.sortOptions.length >= 2
		},

		filteredRecords () {
			return flow(
				reject([this.sorting.field, null]),
				filter(this.includesString(this.filter)),
				orderBy([this.sorting.field], [this.sorting.order])
			)(this.records)
		},

		isAnyActive () {
			return true
		}
	},

	methods : {
		includesString (string) {
			return flow(
				filter(isString),
				some(val => includes(
					val.toLowerCase(),
					this.filter.toLowerCase()
				))
			)
		}
	},

	components : {
		CircleImage
	}
}
</script>

<style scoped>
.list-group-item {
	display: flex;
	align-items: center;
}
.list-group-item > .glyphicon-menu-right {
	flex-grow: 1;
}

.record-text {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

a {
	cursor: pointer;
}
</style>
