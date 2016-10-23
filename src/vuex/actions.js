import Vue from 'vue'
import flow from 'lodash/fp/flow'
import groupBy from 'lodash/fp/groupBy'
import map from 'lodash/fp/map'

let apiCallHistory = {} // stupid cache

function apiGet (resource, callback) {
	if (!apiCallHistory[resource]) {
		Vue.http.get(resource + '?pretty=0').then(
			({data : data}) => {
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
	apiGet('turniere/fotos', (data) => {
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
	apiGet('spieler/'+id, (data) => {
		store.dispatch('UPDATE_STATS', 'players', 'spieler_id', data)
	})

	apiGet('spieler/'+id+'/schluecke', (data) => {
		store.dispatch('UPDATE_STATS', 'players', 'spieler_id', {
			'spieler_id' : id,
			'schluecke' : data
		})
	})
}

export function loadTeamDetails (store, id) {
	apiGet('mannschaften/'+id, (data) => {
		store.dispatch('UPDATE_STATS', 'teams', 'mannschaft_id', data)
	})
}

export function loadTournamentDetails (store, id) {
	apiGet('turniere/'+id, (data) => {
		store.dispatch('UPDATE_STATS', 'tournaments', 'turnier_id', data)
	})

	apiGet('turniere/'+id+'/spiele', (data) => {
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
		)(data)

		store.dispatch('UPDATE_STATS', 'tournaments', 'turnier_id', {
			'turnier_id' : id,
			'phasen' : matchesGrouped
		})
	})
}
