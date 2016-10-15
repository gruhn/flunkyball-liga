import Vue from 'vue'
import Vuex from 'vuex'
import each from 'lodash/each'
import isArray from 'lodash/isArray'

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
			records = (isArray(records) ? records : [records])

			let data = state.stats[statClass]

			each(records, record => {
				let id = record[idField]

				if (data[id] === undefined)
					Vue.set(data, id, {})

				each(record, (val, key) => {
					Vue.set(data[id], key, val)
				})
			})
		}

	}
})

export default store
