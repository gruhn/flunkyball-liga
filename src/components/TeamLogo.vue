<template>
	<img :src="logoSrc" alt="{{team.name Logo}}" :style="style" class="team-logo">
</template>

<script>
export default {
	props : {
		team : {
			type : Object,
			required : true
		},

		size : {
			default : 160
		}
	},

	computed : {
		logoSrc () {
			if (team.hat_logo)
				return "../assets/team-logos/"+ team.mannschaft_id +".png"
			else
				return "../assets/no-logo.png"
		},

		style () {
			return {
				'background-color' : 'hsl('+((team.mannschaft_id * 30) % 361)+', 50%, 80%)',
				'width' : this.size + 'px',
				'height' : this.size + 'px'
			}
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

<style>
.team-logo {
	border-radius: 50%;

	/*background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: url("./assets/no-logo.png");*/
	background-color: #e3e3e3;

	display: inline-block;
}
</style>
