<template>
	<header :class="{'landing' : $route.path === '/'}">
		<main-navi :links="naviLinks"></main-navi>
		<banner></banner>
	</header>

	<main :class="{'landing' : $route.path === '/'}">
		<router-view></router-view>
	</main>

	<page-footer></page-footer>
</template>

<script>
import MainNavi from './components/MainNavi'
import Banner from './components/Banner'
import PageFooter from './components/PageFooter'

export default {
	data () {
		return {
			naviLinks : [
				{text : 'Flunkyball-Liga.org', link : {path : '/'}},
				{text : 'Turniere', link : {path : '/turniere'}},
				{text : 'Mannschaften', link : {path : '/mannschaften'}},
				{text : 'Spieler', link : {path : '/spieler'}},
				{text : 'Regelwerk', link : {path : '/regelwerk'}}
			]
		}
	},

	components : {
		Banner, MainNavi, PageFooter
	}
}
</script>

<style>
body {
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: -1px;
	left: 0px;

	overflow-x: hidden;

	font-family: "Open Sans", sans-serif;
}

p {
	line-height: 1.5;
}

main {
	min-height: 60%;
	position: relative;
}

header {
	height: 40%;
	position: relative;
}
header.landing {height: 60%;}
main.landing {min-height: 40%;}

td, th {
	vertical-align: middle !important;
}
td {
	text-align: center;
}

a:active,
a:hover {
	outline: none;
}

/*.team-logo {
	border-radius: 50%;

	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: url("./assets/no-logo.png");
	background-color: #e3e3e3;

	width: 160px;
	height: 160px;

	display: block;
}
.team-logo-small {
	height: 32px;
	width: 32px;
	margin-right: 10px;
}*/

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
