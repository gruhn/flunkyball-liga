
import reduce from 'lodash/reduce'

let deviceClasses = [
	{name : 'extra-small', cls : 'xs', minWidth : 0},
	{name : 'small', cls : 'sm', minWidth : 768},
	{name : 'medium', cls : 'md', minWidth : 992},
	{name : 'large', cls : 'lg', minWidth : 1200}
]

export default {
	data () {
		return {
			deviceClass : deviceClasses[0]
		}
	},

	methods : {
		handleResize () {
			this.deviceClass = reduce(
				deviceClasses,

				(bestMatch, cls) => {
					if (bestMatch.minWidth < cls.minWidth && window.innerWidth >= cls.minWidth)
						return cls
					else
						return bestMatch
				},

				deviceClasses[0]
			)
		}
	},

	created () {
		this.handleResize()
  		window.addEventListener('resize', this.handleResize)
	},

	beforeDestroy () {
	  	window.removeEventListener('resize', this.handleResize)
  	}
}
