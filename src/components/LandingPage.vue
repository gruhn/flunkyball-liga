<template>
	<section id="intro-section">
		<div class="spacer" aria-hidden="true"></div>

		<div class="container">
			<p>
				Flunkyball-Liga.org ist ein Projekt zur Förderung der großartigen Sportart Flunkyball.
				Mit dem 26. Juni 2015 wurden erstmals die statistischen Daten eines Flunkyball-Turniers
				erfasst und hier veröffentlicht. Seither wurden <strong>{{stats.anzahl_turniere}} Turniere</strong>
				aufgezeichnet, an denen zusammen <strong>{{stats.anzahl_teilnehmer_total}} Spieler</strong>
				teilgenommen haben, mit insgesamt <strong>{{stats.anzahl_spiele_total}} Spielen</strong>,
				in denen <strong>{{stats.anzahl_spiele_total * 5}} Liter</strong> Bier vertilgt wurden.
			</p>
		</div>

		<div class="spacer" aria-hidden="true"></div>
	</section>

	<responsive-image :src="images"></responsive-image>

	<!--<section id="newsletter-section">
		<div class="container">
			<h2>Wann ist das nächste Turnier?</h2>
			<p>
				Lass dich per E-Mail benachrichtigen, sobald ein Turnier ansteht.
				Du bekommst nichts anderes als Turnier-Benachrichtigungen und
				kannst den Newsletter jeder Zeit wieder abbestellen.
			</p>

			<form method="post" action="">
				<div class="form-group">
					<input
						type="email"
						class="form-control input-lg"
						aria-label="E-Mail-Adresse"
						placeholder="E-Mail-Adresse">
				</div>

				<button
					type="submit"
					class="btn btn-primary btn-lg">
					Abbonieren
				</button>
			</form>
		</div>
	</section>-->
</template>

<script>
import ResponsiveImage from './ResponsiveImage'

export default {
	data () {
		return {
			stats : {
				'anzahl_turniere' : 0,
				'anzahl_teilnehmer_total' : 0,
				'anzahl_spiele_total' : 0
			},

			images : {
				'large' : 'http://localhost/flunkyball-liga.org/www2/files/turnier-fotos/separator-lg.jpg',
				'middle' : 'http://localhost/flunkyball-liga.org/www2/files/turnier-fotos/separator-md.jpg',
				'small' : 'http://localhost/flunkyball-liga.org/www2/files/turnier-fotos/separator-sm.jpg',
				'extra-small' : 'http://localhost/flunkyball-liga.org/www2/files/turnier-fotos/separator-xs.jpg',
			}
		}
	},

	methods : {
		loadStats () {
			this.$http.get('turniere?pretty=0').then(response => {
				response.data.filter(item => {
					return item.gab_datenerfassung
				}).forEach(item => {
					this.$http.get('turniere/'+ item.turnier_id +'?pretty=0', {cache : true}).then(response => {
						this.stats.anzahl_turniere += 1
						this.stats.anzahl_teilnehmer_total += response.data.anzahl_teilnehmer
						this.stats.anzahl_spiele_total += response.data.anzahl_spiele
					})
				})
			})
		}
	},

	created () {
		this.loadStats()
	},

	components : {
		ResponsiveImage
	}
}
</script>

<style scoped>
#intro-section {
	font-size: 20px;
	line-height: 2;

	font-family: "Josefin Sans";
	text-align: center;

	background-color: #fff;
}

main {
	background-color: #000;
}

.spacer {
	display: block;
	height: 50px;
}

@media (min-width: 768px) {
	#intro-section {
		font-size: 25px;
	}

	.spacer {
		height: 100px;
	}
}
@media (min-width: 992px) {
	#intro-section {
		font-size: 28px;
		line-height: 2;
	}

	.spacer {
		height: 150px;
	}
}

section {
	padding: 40px 0px;
	overflow: auto;
	text-align: center;
}

/*.section-separator {
	background-color: #dadada;
	width: 60%;
	height: 1px;
	margin: 20px auto;
}

#newsletter-section {
	background-color: #000;
	color: #fff;
}
#newsletter-section > .container {
	max-width: 750px;
}

form {
	max-width: 300px;
	margin: 0px auto;
	padding: 20px 0px;
}*/
</style>
