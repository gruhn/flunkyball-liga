<template>
	<footer>
		Copyright © {{year}} Niklas Gruhn |
		Fotos von Mascha & Nike |
		Icons von
			<a href="http://www.icons8.com" target="_blank">icons8.com</a> &
			<a href="http://glyphicons.com/" target="_blank">glyphicons.com</a>
	</footer>
</template>

<script>
export default {
	computed: {
		year() {
			return new Date().getFullYear()
		}
	}
}
</script>

<style scoped>
footer {
	background-color: #535353;
	color: #fff;
	text-align: center;
	padding: 10px 20px;
}
footer > a,
footer > a:hover,
footer > a:focus,
footer > a:active {
	color: inherit;
}
</style>
