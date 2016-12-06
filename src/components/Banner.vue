<template>
	<div id="banner">
		<div class="banner-image" aria-hidden="true" :style="diaStyle"></div>

		<!--<transition name="banner-fade">
			<img
				v-for="(dia, idx) in dias"
				v-if="diaPointer === idx"
				:src="dia[deviceClass.name]"
				alt="Panorama-Banner"
				class="banner-image">
		</transition>-->
	</div>
</template>

<script>
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
			let src = get(this, 'dias['+ this.diaPointer +'].'+ this.deviceClass.name, '')

			return {
				'background-image' : 'url('+ src +')'
			}
		},

		/*diaSource () {
			return get(this, 'dias['+ this.diaPointer +'].'+ this.deviceClass.name, '')
		}*/
	},

	data () {
		return {
			diaPointer : 0
		}
	},

	methods : {
		nextDia () {
			this.gotoDia(this.diaPointer + 1)
		},

		prevDia () {
			this.gotoDia(this.diaPointer - 1)
		},

		gotoDia (index) {
			this.diaPointer = (Math.abs(index) * this.dias.length + index) % this.dias.length
		}
	},

	created () {
		this.loadBannerImages()

		//setInterval(this.nextDia, 11000)
	}
}
</script>

<style>
#banner {
	position: absolute;
	top: 50px;
	right: 0px;
	bottom: 0px;
	left: 0px;

	overflow: hidden;
}

.banner-image {
    position: fixed;
	/*top: 0;
	left: 0;
	right: 0;*/
	width: 100%;
	height: 40%; /* = header height */

    background-color: #e3e3e3;
    background-repeat: no-repeat;
	background-position: 50% 33%;
    background-size: cover;

    will-change: transform;
    z-index: -1;
}

/*.banner-image {
	z-index: 10;

	position: absolute;
	display: block;

	min-width: 120%;
	min-height: 300%;

	animation-name: bannerMove;
	animation-duration: 22s;
	animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.banner-fade-enter {
	opacity: 1;
}
.banner-fade-enter-active {
	opacity: 0;
}
.banner-fade-leave {
	opacity: 0;
}
.banner-fade-leave-active {
	opacity: 1;
}

@media (min-width: 768px) {
	.banner-image {
	}
}
@media (min-width: 992px) {
	.banner-image {
	}
}
@media (min-width: 1200px) {
	.banner-image {

	}
}

@keyframes bannerMove {
	0% {
		top: -50%;
		left: -10%;
	}

 	100% {
		top: -150%;
		left: -20%;
	}
}*/
</style>
