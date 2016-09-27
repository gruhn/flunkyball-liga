<template>
	<span class="team-logo team-logo-small" :style="logo"></span>
	<span>{{team.name}}</span>
	<span class="glyphicon glyphicon-menu-right text-right"></span>


	<span class="team-logo team-logo-small" v-if="optionsDefault.itemIconStyling(item)" :style="optionsDefault.itemIconStyling(item)"></span>
	<span>{{optionsDefault.itemLabelTemplate(index, item, sorting)}}</span>
	<span class="glyphicon glyphicon-menu-right text-right"></span>
</template>

<script>
export default {
	props : {
		team : {
			type : Object,
			required : true
		}
	},

	computed : {
		logo () {
			if (team.hat_logo)
				return {'background-image' : 'url("assets/team-logos/'+ team.mannschaft_id +'.png"'}
			else
				return {'background-color' : 'hsl('+((team.mannschaft_id * 30) % 361)+', 50%, 80%)'}
		}
	}
}
</script>
