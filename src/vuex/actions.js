import Vue from 'vue'

export function loadPlayers (store) {
	Vue.http.get('spieler?pretty=0').then(
		({data : data}) => {
			if (data != undefined)
				store.dispatch('UPDATE_STATS', 'players', 'spieler_id', data)
		}
	)
}

export function loadPlayerDetails (store, id) {
	Vue.http.get('spieler/'+id+'?pretty=0').then(
		({data : data}) => {
			if (data != undefined)
				store.dispatch('UPDATE_STATS', 'players', 'spieler_id', [data])
		}
	)

	Vue.http.get('spieler/'+id+'/schluecke?pretty=0').then(
		({data : data}) => {
			if (data != undefined)
				store.dispatch('UPDATE_STATS', 'players', 'spieler_id', [{
					'spieler_id' : id,
					'schluecke' : data
				}])
		}
	)
}
