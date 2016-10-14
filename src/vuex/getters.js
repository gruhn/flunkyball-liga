import toArray from 'lodash/toArray'

export function getPlayers (state) {
	return toArray(state.stats.players)
}

export function getTeams (state) {
	return toArray(state.stats.teams)
}

export function getTournaments (state) {
	return toArray(state.stats.tournaments)
}
