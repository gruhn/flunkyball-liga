<template>
	<div :style="bounds" class="circle-image">
		<img
			:src="src"
			aria-hidden="true"
			class="img-responsive img-circle"
			:style="{'background-color' : color}">
	</div>
</template>

<script>
export default {
	props : ['src', 'color', 'size'],

	computed : {
		bounds () {
			return {
				'width' : this.size + 'px',
				'height' : this.size + 'px',
				'min-width' : this.size +'px',
				'min-height' : this.size +'px'
			}
		}
	}
}
</script>

<style>
</style>
