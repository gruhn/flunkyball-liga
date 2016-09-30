import Vue from 'vue'

export function loadPlayers (store) {
	Vue.http.get('spieler?pretty=0').then(
		response => {
			if (response != undefined && response.data != undefined)
				store.dispatch('UPDATE_STATS', 'players', 'spieler_id', response.data)
		}
	)
}

export function loadPlayerDetails (store, id) {
	Vue.http.get('spieler/'+id+'?pretty=0').then(
		response => {
			if (response != undefined && response.data != undefined)
				store.dispatch('UPDATE_STATS', 'players', 'spieler_id', response.data)
		}
	)

	Vue.http.get('spieler/'+id+'/schluecke?pretty=0').then(
		response => {
			if (response != undefined && response.data != undefined)
				store.dispatch('UPDATE_STATS', 'players', 'spieler_id', [{
					'spieler_id' : id,
					'schluecke' : response.data
				}])
		}
	)
}
