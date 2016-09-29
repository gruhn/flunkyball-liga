import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root = 'http://192.168.0.11/flunkyball-liga.org/www2/api/v1'
// https://flunkyball-liga/api/v1 in production

import App from './App'
import LandingPage from './components/LandingPage'
import TournamentView from './components/TournamentView'
import TeamList from './components/TeamList'
import TeamDetails from './components/TeamDetails'
import PlayerList from './components/PlayerList'
import Rules from './components/Rules'

var router = new VueRouter()

router.map({
    '/': {
		name : 'start',
        component : LandingPage
    },
    '/turniere': {
		name : 'tournaments',
        component : TournamentView
    },
    '/mannschaften' : {
		name : 'teams',
        component : TeamList/*,
		subRoutes : {
			'/:id' : {
				component : TeamDetails
			}
		}*/
    },
    '/spieler': {
		name : 'players',
        component: PlayerList
    },
    '/regelwerk': {
		name : 'rules',
        component: Rules
    }
})

router.start(App, '#app')


Vue.filter('unit', function (number, unit) {
	if (number == undefined)
		return undefined

	if (('%€$').includes(unit))
		return number + unit
	else if (('Ø§').includes(unit))
		return unit +' '+ number
	else
		return number
})
Vue.filter('pad', function (number, size) {
	let str = number + "";

	while (str.length < size)
		str = "0" + str;

	return str;
})
Vue.filter('orElse', function (value, altValue) {
	if (value == undefined)
		return altValue

	return value
})
Vue.filter('number', function (number, digits) {
	if (number == undefined)
		return undefined

	if (digits !== undefined)
		number = number.toFixed(digits)

	return number.replace('.', ',')
})


new Vue({
	el: 'body'
})
