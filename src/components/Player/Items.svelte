<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";

	export let items, role;

	let canvas;
	let chart;

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
			// chart.data.labels = [];
			chart.data.datasets = items.map(({ name, count }, i) => {
				return {
					label: name,
					data: [count],
					backgroundColor: `rgba(${chartColors[role][i % chartColors[role].length]}, 0.2)`,
					borderColor: `rgb(${chartColors[role][i % chartColors[role].length]})`
				};
			});
			chart.update();
		}
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type: "bar",
			options: {
				maintainAspectRatio: false,
				indexAxis: "y",
				borderWidth: 1.5,
				interaction: {
					intersect: true,
					mode: "point"
				},
				scales: {
					x: { stacked: true },
					y: { stacked: true, display: false }
				},
				plugins: {
					legend: {
						display: false
					}
				}
			},
			data: {
				labels: ["Times bought"],
				datasets: []
			}
		});
	});
</script>

<div class="chart">
	<canvas bind:this={canvas} />
</div>

<style>
	.chart {
		width: 100%;
		height: 100px;
	}
</style>
