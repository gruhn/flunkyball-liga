import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import moment from 'moment'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root = '/api/v1'

moment.locale('de')

import App from './App'
import router from './router'

new Vue({
	el : '#mountee',
	router : router,
	render : h => h(App)
})
