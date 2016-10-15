import Vue from 'vue'
import groupBy from 'lodash/groupBy'
import mapValues from 'lodash/mapValues'

function apiGet (resource, callback) {
	Vue.http.get(resource + '?pretty=0').then(
		({data : data}) => {
			if (data != undefined)
				callback(data)
		}
	)
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

		let xs = data

		xs = groupBy(xs, item => {
			if (item.turnierphase_id === 5)
				return item.gruppe + item.rueckspiel
			else
				return "P"+ item.turnierphasen_index
		})

		xs = mapValues(xs, matches => {matchList : matches})
		xs = mapValues(xs, group => {
			if (group.turnierphase_id === 5) {
				group.name = 'Gruppe '+ item.gruppe

				if (item.rueckspiel > 1)
					group.rueckrunde = "Rückrunde "+ item.rueckspiel
				else if (item.rueckspiel === 1)
					group.rueckspiel = "Rückrunde"
				else
					group.rueckspiel = ""
			} else {
				group.name = item.turnierphase
				group.rueckrunde = ""
			}
		})

		/*let matchGroups = {}

		response.data.forEach(item => {
			var phase = "P"+item.turnierphasen_index;
			if (item.turnierphase_id == 5)
				phase += item.gruppe + item.rueckspiel;

			if (matchGroups[phase] == undefined) {
				matchGroups[phase] = {};
				matchGroups[phase].matchList = [];
				matchGroups[phase].key = phase;

				if (item.turnierphase_id == 5) {
					matchGroups[phase].name = 'Gruppe ' + item.gruppe;

					if (item.rueckspiel > 1)
						matchGroups[phase].rueckrunde = "Rückrunde "+ item.rueckspiel;
					else if (item.rueckspiel === 1)
						matchGroups[phase].rueckrunde = "Rückrunde";
					else
						matchGroups[phase].rueckrunde = "";
				} else {
					matchGroups[phase].name = item.turnierphase;
					matchGroups[phase].rueckrunde = "";
				}

			}

			matchGroups[phase].matchList.push(item);
		})

		matchGroups.keys().forEach(item => {
			me.matchesGrouped.push(item);
		})*/

		/*store.dispatch('UPDATE_STATS', 'tournaments', 'turnier_id', {
			'turnier_id' : id,
			'spiele' : [] // TODO
		})*/
	})
}
