<template>
	<div class="container">
		<section>
			<p>
				Flunkyball-Liga.org ist ein Projekt zur Förderung der großartigen Sportart Flunkyball.
				Mit dem 26. Juni 2015 wurden erstmals die statistischen Daten eines Flunkyball-Turniers
				erfasst und hier veröffentlicht. Seither wurden <strong>{{stats.anzahl_turniere}} Turniere</strong>
				aufgezeichnet, an denen zusammen <strong>{{stats.anzahl_teilnehmer_total}} Spieler</strong>
				teilgenommen haben, mit insgesamt <strong>{{stats.anzahl_spiele_total}} Spielen</strong>,
				in denen <strong>{{stats.anzahl_spiele_total * 5}} Liter</strong> Bier vertilgt wurden.
			</p>
		</section>

		<div class="section-separator"></div>

		<section id="newsletter-section">
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
		</section>
	</div>
</template>

<script>
export default {
	data () {
		return {
			stats : {
				'anzahl_turniere' : 0,
				'anzahl_teilnehmer_total' : 0,
				'anzahl_spiele_total' : 0
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
	}
}
</script>

<style scoped>
p {
	font-size: 21px;
	line-height: 2;
}

section {
	padding: 40px 0px;
	overflow: auto;
	text-align: center;
}

.section-separator {
	background-color: #dadada;
	width: 60%;
	height: 1px;
	margin: 20px auto;
}

#newsletter-section {
	max-width: 750px;
	margin: 0px auto;
}

form {
	max-width: 300px;
	margin: 0px auto;
	padding: 20px 0px;
}
</style>
