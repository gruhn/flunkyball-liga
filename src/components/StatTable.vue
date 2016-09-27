<template>
	<div class="panel panel-default">
		<div class="panel-heading">{{heading.main}} <small>{{heading.sub}}</small></div>

		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th v-for="column in columns">{{column.label}}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in rows">
						<th>{{row.label}}</th>
						<td v-for="cell in row.cells">{{cell}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	props : {
		heading : {
			type : Object
		},

		columns : {
			type : Array
		},

		rows : {
			type : Array
		}
	}
}
</script>

<style>
</style>
