<template>
	<img v-if="src !== undefined" :src="viewportSrc" :alt="alt" :style="" class="img-responsive">
</template>

<script>
import deviceClass from '../mixins/device-class'

export default {
	mixins : [deviceClass],

	props : {
		src : {},
		alt : {
			default : ""
		}
	},

	computed : {
		viewportSrc () {
			return this.src[this.deviceClass.name]
		}
	}
}
</script>

<style scoped>
</style>
