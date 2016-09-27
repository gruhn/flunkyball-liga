import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root = 'http://192.168.0.14/flunkyball-liga.org/www2/api/v1'
// https://flunkyball-liga/api/v1 in production

import App from './App'
import LandingPage from './components/LandingPage'
import TournamentView from './components/TournamentView'
import TeamList from './components/TeamList'
import TeamDetails from './components/TeamDetails'
import Rules from './components/Rules'

var router = new VueRouter()

router.map({
    '/': {
        component : LandingPage
    },
    '/turniere': {
        component: TournamentView
    },
    '/mannschaften' : {
        component : TeamList,
		subRoutes : {
			'/:id' : {
				component : TeamDetails
			}
		}
    },
    '/spieler/:id': {
        component: Rules
    },
    '/regelwerk': {
        component: Rules
    }
})

router.start(App, '#app')

new Vue({el: 'body'})
