import Vue from 'vue'
import flow from 'lodash/fp/flow'
import map from 'lodash/fp/map'
import groupBy from 'lodash/fp/groupBy'
import values from 'lodash/values'

let apiCallHistory = {} // stupid cache

function apiGet (resource, callback) {
	if (!apiCallHistory[resource]) {
		Vue.http.get(resource + '.json').then(
			({ data }) => {
				if (data != undefined) {
					apiCallHistory[resource] = true
					callback(data)
				} else {
					apiCallHistory[resource] = false
				}
			}
		)
	}
}

export function loadBannerImages (store) {
	apiGet('fotos', (data) => {
		store.dispatch('SET_BANNER_IMAGES', data)
	})
}

export function loadPlayers (store) {
	apiGet('spieler', (data) => {
		store.dispatch('UPDATE_STATS', 'players', 'spieler_id', data)
	})
}

export function loadTeams (store) {
	apiGet('mannschaften', (data) => {
		store.dispatch('UPDATE_STATS', 'teams', 'mannschaft_id', data)
	})
}

export function loadTournaments (store) {
	apiGet('turniere', (data) => {
		store.dispatch('UPDATE_STATS', 'tournaments', 'turnier_id', data)
	})
}

export function loadPlayerDetails (store, id) {
	// apiGet('spieler/'+id, (data) => {
	// 	store.dispatch('UPDATE_STATS', 'players', 'spieler_id', data)
	// })

	// apiGet('spieler/'+id+'/schluecke', (data) => {
	// 	store.dispatch('UPDATE_STATS', 'players', 'spieler_id', {
	// 		'spieler_id' : id,
	// 		'schluecke' : data
	// 	})
	// })
}

export function loadTeamDetails (store, id) {
	// apiGet('mannschaften/'+id, (data) => {
	// 	store.dispatch('UPDATE_STATS', 'teams', 'mannschaft_id', data)
	// })
}

export function loadTournamentDetails (store, id) {
	// apiGet('turniere/'+id, (data) => {
	// 	store.dispatch('UPDATE_STATS', 'tournaments', 'turnier_id', data)
	// })

	apiGet('spiele', (data) => {
		const tournaments = values(groupBy('turnier_id')(data))

		tournaments.forEach(tournament => {
			let matchesGrouped = flow(
				groupBy(match => {
					if (match.turnierphase_id === 5)
						return match.gruppe + match.rueckspiel
					else
						return "P"+ match.turnierphasen_index
				}),
				map(matchList => {
					let match = matchList[0]
					let group = {
						spiele : matchList,
						name : match.turnierphase,
						rueckspiel : ""
					}

					if (match.turnierphase_id === 5) {
						group.name = 'Gruppe '+ match.gruppe

						if (match.rueckspiel > 1)
							group.rueckrunde = "Rückrunde "+ match.rueckspiel
						else if (match.rueckspiel === 1)
							group.rueckspiel = "Rückrunde"
						else
							group.rueckspiel = ""
					}

					return group
				})
			)(tournament)

			store.dispatch('UPDATE_STATS', 'tournaments', 'turnier_id', {
				'turnier_id' : tournament[0].turnier_id,
				'phasen' : matchesGrouped
			})
		})
	})
}
