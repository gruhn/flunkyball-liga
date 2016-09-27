<template>
	<div class="form-group" v-if="options.sortOptions.length">
		<label>Sortieren nach</label>
		<select
			v-model="sorting"
			type="text"
			class="form-control input-sm">

			<option v-for="option in options.sortOptions" :value="option">{{option.text}}</option>

		</select>
	</div>

	<div class="form-group has-feedback" v-if="options.filterable">
		<label>Filtern</label>
		<input
			v-model="filter"
			type="text"
			class="form-control input-sm">
		<span class="glyphicon glyphicon-search form-control-feedback"></span>
	</div>
</template>

<script>
export default {
	props : {
		filter : {
			type : String
		},

		sorting : {
			type : Object
		},

		options : {
			type : Object,
			required : true
		}
	},

	created () {
		if (this.sorting === undefined) {
			this.sorting = this.options.sortOptions[0]
		}
	}
}
</script>
