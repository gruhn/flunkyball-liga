<template>
	<div id="banner">
		<div v-bind:style="viewportStyle"></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			viewportHeight : 0,
			viewportWidth : 0,
			viewportClasses : [
				{name : 'extra-small', cls : 'xs', minWidth : 0},
				{name : 'small', cls : 'sm', minWidth : 768},
				{name : 'middle', cls : 'md', minWidth : 992},
				{name : 'large', cls : 'lg', minWidth : 1200}
			],

			diaPointer : 0,
			pictures : []
		}
	},

	methods : {
		handleResize () {
			this.viewportWidth = document.documentElement.clientWidth
			this.viewportHeight = document.documentElement.clientHeight
		},

		changePicture () {
			this.diaPointer = (diaPointer + 1) % pictures.length
		}
	},

	ready () {
  		window.addEventListener('resize', this.handleResize)

		this.$http.get('turniere/fotos?pretty=0').then(response => {
			this.pictures = response.data
			this.diaPointer = Math.floor(Math.random() * this.pictures.length)
		})
	},
	beforeDestroy () {
	  	window.removeEventListener('resize', this.handleResize)
  	},

	computed : {
		viewportClass () {
			var self = this

			return this.viewportClasses.reduce(
				(bestMatch, item) => {
					if (bestMatch.minWidth < item.minWidth && self.viewportWidth >= item.minWidth)
						return item
					else
						return bestMatch
				},
				this.viewportClasses[0]
			)
		},

		viewportStyle () {
			if (this.pictures.length) {
				var pictureUrl = this.pictures[this.diaPointer][this.viewportClass.name]
				pictureUrl = "http://localhost/"+ pictureUrl // TEMP !!!

				return {
					'background-image' : 'url("'+ pictureUrl +'")'
				}
			} else {
				return {}
			}
		}
	}
}
</script>

<style scoped>
#banner,
#banner > div {
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
}
#banner > div {
	background-color: #e3e3e3;
	background-position: center 25%;
	background-size: cover;
	background-repeat: no-repeat;
	background-attachment: fixed;

	top: 50px;
}
</style>
