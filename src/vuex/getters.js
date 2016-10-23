import toArray from 'lodash/toArray'
import shuffle from 'lodash/shuffle'


export function getRecords (statClass) {
	return state => toArray(state.stats[statClass])
}
export function getRecordByID (statClass) {
	return state => id => state.stats[statClass][id]
}

export function getShuffledBannerImages (state) {
	return shuffle(state.bannerImages)
}
