<template>
	<div class="circle-image" :style="[{'background-color' : this.color}, bounds]">
		<img :src="src" aria-hidden="true" class="img-responsive">
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
.circle-image {
	border-radius: 50%;

	/*background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	background-color: #e3e3e3;*/
}
</style>
