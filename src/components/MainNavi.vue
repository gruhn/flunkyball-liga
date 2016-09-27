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

				<a class="navbar-brand" v-link="brandLink.link">
					{{brandLink.text}}
				</a>
			</div>

			<div class="navbar-collapse" :transition="transition" v-show="!collapsed" v-bind:class="{'collapse' : collapsed}">
				<ul class="nav navbar-nav navbar-right">
					<li v-for="link in naviLinks">
						<a v-link="link.link" v-on:click="collapse(true)">{{link.text}}</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	props : {
		links : {
			type : Array,
			required : true,
			default : [{text : '', link : {path : '/'}}]
		}
	},

	data () {
		return {
			collapsed : true
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

.collapse-transition {
	transition: max-height .3s;
	overflow: hidden;
	max-height: 500px;
}
.collapse-leave {
	max-height: 0px;
}
.collapse-enter {
	max-height: 500px;
}

.expand-transition {
	transition: max-height .5s;
	overflow: hidden;
	max-height: 500px;
}
.expand-leave {
	max-height: 500px;
}
.expand-enter {
	max-height: 0px;
}
</style>
