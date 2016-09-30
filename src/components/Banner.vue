<template>
	<div id="banner">
		<responsive-image :src="currentPicture"></responsive-image>
	</div>
</template>

<script>
import ResponsiveImage from './ResponsiveImage'

export default {
	data () {
		return {
			diaPointer : 0,
			pictures : []
		}
	},

	methods : {
		nextPicture () {
			this.diaPointer = (diaPointer + 1) % pictures.length
		}
	},

	created () {
		this.$http.get('turniere/fotos?pretty=0').then(response => {
			this.pictures = response.data
			this.diaPointer = Math.floor(Math.random() * this.pictures.length)
		})
	},

	computed : {
		currentPicture () {
			return {
			  	"large": "https://flunkyball-liga.org/files/turnier-fotos/large/2016-05-07_04.jpg",
			  	"middle": "https://flunkyball-liga.org/files/turnier-fotos/middle/2016-05-07_04.jpg",
			  	"small": "https://flunkyball-liga.org/files/turnier-fotos/small/2016-05-07_04.jpg",
			  	"extra-small": "https://flunkyball-liga.org/files/turnier-fotos/extra-small/2016-05-07_04.jpg"
			}

			//return this.pictures[this.diaPointer]
		}
	},

	components : {
		ResponsiveImage
	}
}
</script>

<style>
#banner {
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;

	overflow: hidden;
}

#banner > .img-responsive {
	position: absolute;
	max-width: none;
}

@media (min-width: 768px) {
	#banner > .img-responsive {
		top: -20%;		
	}
}
@media (min-width: 992px) {
	#banner > .img-responsive {
		top: -40%;
	}
}
@media (min-width: 1200px) {
	#banner > .img-responsive {
		top: -60%;
	}
}
</style>
