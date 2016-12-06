<template>
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" @click="toggleCollapse()">
					<span class="sr-only">Menü anzeigen / verstecken</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>

				<router-link :to="brandLink.route" class="navbar-brand">{{brandLink.text}}</router-link>
			</div>

			<transition name="expand">-->
				<div class="navbar-collapse" v-show="!collapsed" :class="{'collapse' : collapsed}">
					<ul class="nav navbar-nav navbar-right">
						<li v-for="link in naviLinks">
							<router-link :to="link.route">{{link.text}}</router-link>
						</li>
					</ul>
				</div>
			</transition>
		</div>
	</nav>
</template>

<script>
export default {
	data () {
		return {
			collapsed : true,

			links : [
				{text : 'Flunkyball Liga', route : {name : 'start'}},
				{text : 'Turniere', route : {name : 'tournaments'}},
				{text : 'Mannschaften', route : {name : 'teams'}},
				{text : 'Spieler', route : {name : 'players'}},
				{text : 'Regelwerk', route : {name : 'rules'}}
			]
		}
	},

	computed : {
		brandLink () {
			return this.links[0]
		},

		naviLinks () {
			return this.links.slice(1)
		},

		transition () {
			return this.collapsed ? 'collapse' : 'expand'
		}
	},

	watch : {
		'$route' () {
			this.collapse(true)
		}
	},

	methods : {
		collapse (collapse) {
			this.collapsed = collapse
		},

		toggleCollapse () {
			this.collapse(!this.collapsed)
		}
	}
}
</script>

<style scoped>
.collapse {
	display: block;
}

.navbar-collapse {
	overflow: hidden;
	max-height: 500px;
}

.navbar-fixed-top {
	backface-visibility: hidden;
}

.expand-enter-active {
	animation: expand .5s;
}
.expand-leave-active {
	animation: collapse .2s;
}

@keyframes expand {
	0% {
		max-height: 0px;
	}
	100% {
		max-height: 500px;
	}
}
@keyframes collapse {
	0% {
		max-height: 500px;
	}
	100% {
		max-height: 0px;
	}
}
</style>
