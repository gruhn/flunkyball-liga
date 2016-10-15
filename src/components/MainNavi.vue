<template>
	<nav class="navbar navbar-default navbar-fixed-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" v-on:click="toggleCollapse()">
					<span class="sr-only">Menü anzeigen / verstecken</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>

				<router-link :to="brandLink.route" class="navbar-brand">{{brandLink.text}}</router-link>
			</div>

			<transition name="expand">
				<div class="navbar-collapse" v-show="!collapsed" :class="{'collapse' : collapsed}"> 
					<ul class="nav navbar-nav navbar-right">
						<li v-for="link in naviLinks">
							<router-link :to="link.route" @click="collapse(true)">{{link.text}}</router-link>
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

.expand-enter {
	transition: max-height .5s;
	overflow: hidden;
	max-height: 0px;
}
.expand-enter-active {
	max-height: 500px;
}

.expand-leave {
	transition: max-height .3s;
	overflow: hidden;
	max-height: 500px;
}
.expand-leave-active {
	max-height: 0px;
}
</style>
