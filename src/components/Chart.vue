<template>
	<canvas height="250" v-el:canvas></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
	props : ["data"],

	data () {
		return {
			chartObj : undefined
		}
	},

	watch : {
		data (newValue) {
			if (this.chartObj !== undefined)
				this.chartObj.destroy()
			if (newValue !== undefined)
				this.chartObj = this.createChart(newValue)
		}
	},

	methods : {
		createChart (data) {
			return new Chart(this.$els.canvas.getContext("2d"), {
			    type: 'line',
			    data: {
					labels : Array(data.length).fill(""),
					datasets : [
						{
							data : data,
							label : "Schlücke",
							fill : false,
							borderColor: "rgba(51, 122, 183, 1.0)"
						}
					]
				},
			    options: {
					legend : {
						display : false
					},

			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero : true,
								stepSize : 1,
								min : 0,
								suggestedMax : 8
			                }
			            }],

						xAxes: [{
			                display: false
			            }]
			        }
			    }
			})
		}
	}
}
</script>

<style>
</style>
