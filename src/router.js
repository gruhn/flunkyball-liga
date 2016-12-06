import VueRouter from 'vue-router'

import LandingPage from './components/LandingPage'
import TournamentList from './components/TournamentList'
import TournamentDetails from './components/TournamentDetails'
import TeamList from './components/TeamList'
import TeamDetails from './components/TeamDetails'
import PlayerList from './components/PlayerList'
import PlayerDetails from './components/PlayerDetails'
import Rules from './components/Rules'

export default new VueRouter({
	//mode: 'history',

	/*scrollBehavior (to, from, savedPosition) {
		return {x : 0, y : 0}
	},*/

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
