import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

//Vue.http.options.root = '/api/v1'
Vue.http.options.root = 'http://192.168.0.11:80/flunkyball-liga.org/www2/api/v1'

moment.locale('de')

import App from './App'
import LandingPage from './components/LandingPage'
import TournamentList from './components/TournamentList'
import TournamentDetails from './components/TournamentDetails'
import TeamList from './components/TeamList'
import TeamDetails from './components/TeamDetails'
import PlayerList from './components/PlayerList'
import PlayerDetails from './components/PlayerDetails'
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
			component : TournamentList,
			children : [
				{
					path : '/turniere/:id',
					name : 'tournament',
					component : TournamentDetails
				}
			]
		}, {
			path : '/mannschaften',
			name : 'teams',
			component : TeamList,
			children : [
				{
					path : '/mannschaften/:id',
					name : 'team',
					component : TeamDetails
				}
			]
		}, {
			path : '/spieler',
			name : 'players',
			component : PlayerList,
			children : [
				{
					path : '/spieler/:id',
					name : 'player',
					component : PlayerDetails
				}
			]
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
