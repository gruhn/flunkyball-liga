<template>
	<div :class="'page ' + pageClass" id="app">
		<header>
			<main-navi></main-navi>
			<banner></banner>
		</header>

		<main>
			<router-view></router-view>
		</main>

		<page-footer></page-footer>
	</div>
</template>

<script>
import Vue from 'vue'
import store from './vuex/store'
import MainNavi from './components/MainNavi'
import Banner from './components/Banner'
import PageFooter from './components/PageFooter'

Vue.filter('otherwise', function (val, alt) {
	if (val === undefined || val === null || val === NaN)
		return alt
	return val
})
Vue.filter('unit', function (number, unit) {
	if (number == undefined || number == NaN)
		return undefined

	if (('%€$').includes(unit))
		return number + unit
	else if (('Ø§').includes(unit))
		return unit +' '+ number
	else
		return number
})
Vue.filter('number', function (number, digits) {
	if (number == undefined || number == NaN)
		return undefined

	if (digits !== undefined)
		number = number.toFixed(digits)

	return number.replace('.', ',')
})
Vue.filter('date', function (dateString) {
	if (dateString == undefined || dateString == NaN)
		return undefined

	let format = ""
	let date = new Date(dateString)
	let month = [
		'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
		'August', 'September', 'Oktober', 'November', 'Dezember'
	]

	format += date.getDate() +". "
	format += month[date.getMonth()] +" "
	format += date.getFullYear()

	return format
})

export default {
	computed : {
		pageClass () {
			if (this.$route.name === 'start')
				return 'landing-page'
			else
				return ''
		}
	},

	components : {
		Banner, MainNavi, PageFooter
	},

	store
}
</script>

<style>
* {
	outline: none;
}

body {
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: -5px;
	left: 0px;

	overflow-x: hidden;

	font-family: "Open Sans", sans-serif;
}
#app {
	height: 100%;
}

p {
	line-height: 1.5;
}

#app > main {
	min-height: 60%;
	position: relative;
}
#app > header {
	height: 40%;
	position: relative;
}

#app.landing-page > header {
	height: 0%;
}
#app.landing-page > header #banner > div {
	/*background-position: center center;*/
}
#app.landing-page > main {
	min-height: 100%;
	background-color: #000;
}

td, th {
	vertical-align: middle !important;
}
td {
	text-align: center;
}

a {
	transition: color .2s;
	text-decoration: none;
}
a:hover, a:focus, a:active {
	text-decoration: none;
}

.glyphicon-podium {
	background-image: url("./assets/glyphicons-podium.png");
	background-position: center center;
	background-repeat: no-repeat;

	display: block;
	min-width: 25px;
	min-height: 20px;
	width: 100%;
	height: 100%;
}
</style>
