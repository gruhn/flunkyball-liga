import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state : {
		//loading : false,

		stats : {
			teams : {},
			players : {},
			tournaments : {}
		}

	},

	mutations : {

		'UPDATE_STATS' (state, statClass, idField, records) {
			let data = state.stats[statClass]

			records.forEach(
				record => {
					let id = record[idField]

					if (data[id] === undefined)
						Vue.set(data, id, {})

					record.keys().forEach(key => {
						Vue.set(data[id], key, record[key])
					})
				}
			)
		}

	}
})
