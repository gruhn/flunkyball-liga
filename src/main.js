import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

//Vue.http.options.root = '/api/v1'
Vue.http.options.root = 'http://localhost:80/flunkyball-liga.org/www2/api/v1'

moment.locale('de')

import App from './App'
import LandingPage from './components/LandingPage'
import TournamentList from './components/TournamentList'
import TeamList from './components/TeamList'
import PlayerList from './components/PlayerList'
import Rules from './components/Rules'

var router = new VueRouter({
	routes : [
		{
			path : '/',
			name : 'start',
			component : LandingPage
		}, {
			path : '/turniere',
			name : 'tournaments',
			component : TournamentList
		}, {
			path : '/mannschaften',
			name : 'teams',
			component : TeamList
		}, {
			path : '/spieler',
			name : 'players',
			component : PlayerList
		}, {
			path : '/regelwerk',
			name : 'rules',
			component : Rules
		},
	]
})

new Vue({
	el : '#mountee',
	router : router,
	render : h => h(App)
})
