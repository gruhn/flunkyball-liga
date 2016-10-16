<template>
	<div class="row">
		<aside class="col-xs-12 col-sm-4" :class="{'hidden-xs' : isAnyActive}">

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
				<a  v-for="(record, index) in filteredRecords"
					@click="handleRecordClick(record)"
					:class="{'active' : isActive(record)}"
					class="list-group-item">

					<circle-image
						v-if="displayIcon"
						:src="options.mapping.iconUrl(record)"
						:color="options.mapping.iconBg(record)"
						size="32"
					></circle-image>
					<div class="record-text" v-html="options.mapping.text(record, sorting)"></div>
					<div class="glyphicon glyphicon-menu-right text-right"></div>

				</a>
			</div>
		</aside>

		<div class="col-xs-12 col-sm-8" v-if="isAnyActive">
			<slot></slot>
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
			selected : undefined,
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
			return true
		},

		filteredRecords () {
			return flow(
				reject([this.sorting.field, null]),
				filter(this.includesString(this.filter)),
				orderBy([this.sorting.field], [this.sorting.order])
			)(this.records)
		},

		isAnyActive () {
			return this.selected !== undefined
		}
	},

	methods : {
		handleRecordClick (record) {
			this.selected = record
			this.$emit('record-click', record)
		},

		includesString (string) {
			return flow(
				filter(isString),
				some(val => includes(
					val.toLowerCase(),
					this.filter.toLowerCase()
				))
			)
		},

		isActive (record) {
			return this.selected === record
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
