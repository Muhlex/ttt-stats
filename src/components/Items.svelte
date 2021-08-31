<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";

	export let items;

	let canvas;
	let chart;
	let role;

	const chartColors = {
		traitor: [
			"255, 99, 132",
			"191, 74, 99"
		],
		detective: [
			"54, 162, 235",
			"39, 118, 170"
		]
	};

	$: {
		if (chart && role) {
			chart.data.labels = [];
			chart.data.datasets[0].data = items[role];
			chart.options.backgroundColor = chartColors[role].map(rgb => `rgba(${rgb}, 0.2)`);
			chart.options.borderColor = chartColors[role].map(rgb => `rgb(${rgb})`);
			chart.update();
		}
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type: "bar",
			options: {
				aspectRatio: 3,
				indexAxis: "y",
				borderWidth: 1.5,
				plugins: {
					legend: {
						display: false
					}
				}
			},
			data: {
				datasets: [
					{
						data: [],
						label: "Times bought",
						parsing: {
							yAxisKey: "name",
							xAxisKey: "count"
						}
					}
				]
			}
		});
	});
</script>

<h2>Items</h2>
<label for="item-role">Select role</label>
<select id="item-select-role" bind:value={role}>
	<option value="traitor">Traitor</option>
	<option value="detective">Detective</option>
</select>

<div class="chart">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.chart {
		margin-bottom: 1em;
	}
</style>
