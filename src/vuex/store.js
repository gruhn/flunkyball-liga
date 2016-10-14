import Vue from 'vue'
import Vuex from 'vuex'
import each from 'lodash/each'
import merge from 'lodash/merge'

Vue.use(Vuex)

const store = new Vuex.Store({
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

			each(records, record => {
				let id = record[idField]
				/*let recordWatchable = {}

				each(record, (val, key) => {
					Vue.set(recordWatchable, key, val)
				})*/

				if (data[id] === undefined)
					Vue.set(data, id, {})

				data[id] = merge(data[id], recordWatchable)
			})
		}

	}
})

export default store
