<template>
	<footer>
		<div class="container">
			© {{year}} Niklas Gruhn |
			Fotos von Mascha & Nike |
			Icons von
				<a href="http://www.icons8.com" target="_blank" class="text-link">icons8.com</a> &
				<a href="http://glyphicons.com/" target="_blank" class="text-link">glyphicons.com</a>
		</div>
	</footer>
</template>

<script>
export default {
	computed : {
		year () {
			return new Date().getFullYear()
		}
	}
}
</script>

<style scoped>
footer {
	background-color: #000;
	color: #fff;
}
footer > .container {
	padding-top: 10px;
	padding-bottom: 10px;

	text-align: center;
}

a {
	color: #d0d0d0;
}
a:hover {
	color: #fff;
}

footer {
	background-color: #000;
}
</style>
