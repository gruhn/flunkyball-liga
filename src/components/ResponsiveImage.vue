<template>
	<img v-if="src !== undefined" :src="viewportSrc" :alt="alt" :style="" class="img-responsive">
</template>

<script>
export default {
	props : {
		src : {},
		alt : {
			default : ""
		}
	},

	data () {
		return {
			viewportHeight : 0,
			viewportWidth : 0,
			viewportClasses : [
				{name : 'extra-small', cls : 'xs', minWidth : 0},
				{name : 'small', cls : 'sm', minWidth : 768},
				{name : 'middle', cls : 'md', minWidth : 992},
				{name : 'large', cls : 'lg', minWidth : 1200}
			]
		}
	},

	methods : {
		handleResize () {
			this.viewportWidth = document.documentElement.clientWidth
			this.viewportHeight = document.documentElement.clientHeight
		}
	},

	created () {
		this.handleResize()
  		window.addEventListener('resize', this.handleResize)
	},
	beforeDestroy () {
	  	window.removeEventListener('resize', this.handleResize)
  	},

	computed : {
		viewportClass () {
			let self = this

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

		viewportSrc () {
			return this.src[this.viewportClass.name]
		}
	}
}
</script>

<style scoped>
</style>
