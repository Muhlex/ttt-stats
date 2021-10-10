<script>
	import { getWeaponDisplayName } from "../../js/data/weapons";

	import { onMount } from "svelte";
	import Chart from "chart.js/auto";
	import ChartDataLabels from "chartjs-plugin-datalabels";


	export let weapons, kills;

	let canvas, chart;

	$: {
		if (chart) {
			chart.data.labels = weapons.map(({ name }) => getWeaponDisplayName(name));
			chart.data.datasets[0].data = weapons.map(({ kills }) => kills);
			chart.update();
		}
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type: "doughnut",
			plugins: [ChartDataLabels],
			options: {
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(255, 159, 64, 0.2)",
					"rgba(255, 205, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(171, 172, 173, 0.2)"
				],
				borderColor: [
					"rgb(255, 99, 132)",
					"rgb(255, 159, 64)",
					"rgb(255, 205, 86)",
					"rgb(75, 192, 192)",
					"rgb(54, 162, 235)",
					"rgb(153, 102, 255)",
					"rgb(171, 172, 173)"
				],
				borderWidth: 2,
				plugins: {
					legend: {
						display: false
					},
					datalabels: {
						formatter(value, context) {
							if (value < kills.any.length * 0.025) return "";
							const index = context.dataIndex;
							const label = context.chart.data.labels[index];
							return label;
						}
					}
				}
			},
			data: {
				labels: [],
				datasets: [{
					data: []
				}]
			}
		});
	});
</script>

<div class="chart-weapons">
	<div class="middle">
		{#if weapons.length}
			Favorite weapon:<br>
			<div class="weapon">{getWeaponDisplayName(weapons[0].name)}</div>
		{/if}
	</div>
	<canvas bind:this={canvas} />
</div>

<style>
	.chart-weapons {
		position: relative;
		overflow: hidden; /* somehow chart.js requires this */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.chart-weapons .middle {
		position: absolute;

		text-align: center;
		max-width: 40%;
	}
	.chart-weapons .middle .weapon {
		font-weight: 600;
	}
</style>
