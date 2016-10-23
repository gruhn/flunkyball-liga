<template>
	<div id="banner">
		<div :style="diaStyle"></div>
		<!--<responsive-image :src="currentPicture"></responsive-image>-->
	</div>
</template>

<script>
//import ResponsiveImage from './ResponsiveImage'
import get from 'lodash/get'
import deviceClass from '../mixins/device-class'
import { loadBannerImages } from '../vuex/actions'
import { getShuffledBannerImages } from '../vuex/getters'

export default {
	mixins : [deviceClass],

	vuex : {
		getters : {
			dias : getShuffledBannerImages
		},

		actions : {
			loadBannerImages
		}
	},

	computed : {
		diaStyle () {
			let diaSource = get(this, 'dias['+ this.diaPointer +'].'+ this.deviceClass.name, '')

			return {
				'background-image' : 'url('+ diaSource +')'
			}
		}
	},

	data () {
		return {
			diaPointer : 0
		}
	},

	methods : {
		nextDia () {
			this.diaPointer = (diaPointer + 1) % pictures.length
		}
	},

	created () {
		this.loadBannerImages()
	},

	/*components : {
		ResponsiveImage
	}*/
}
</script>

<style>
#banner, #banner > div {
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
}
#banner > div {
	top: 50px;

	background-color: #e3e3e3;
	background-position: center center;
	background-size: auto;
	background-repeat: no-repeat;
	background-attachment: fixed;
}

/*#banner {
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;

	overflow: hidden;
}

#banner > .img-responsive {
	position: absolute;
	max-width: none;
}

@media (min-width: 768px) {
	#banner > .img-responsive {
		top: -20%;
	}
}
@media (min-width: 992px) {
	#banner > .img-responsive {
		top: -40%;
	}
}
@media (min-width: 1200px) {
	#banner > .img-responsive {
		top: -60%;
	}
}*/
</style>
