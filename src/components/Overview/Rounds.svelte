<script>
	import { onMount } from "svelte";

	import { toMMSS } from "../../js/util";
	import Chart from "chart.js/auto";
	import ChartDataLabels from "chartjs-plugin-datalabels";

	export let totals;

	let canvas;
	let chart;

	$: tableData = [{
		key: "Rounds played",
		value: totals.rounds
	}, {
		key: "Average round length",
		value: toMMSS(totals.playtime / totals.rounds)
	}, {
		key: "Innocent Wins",
		value: (
			Object.values(totals.wins.innocent || { none: 0 }).reduce((acc, val) => acc + val) /
			totals.rounds * 100
		).toFixed() + "%"
	}, {
		key: "Traitor Wins",
		value: (
			Object.values(totals.wins.traitor || { none: 0 }).reduce((acc, val) => acc + val) /
			totals.rounds * 100
		).toFixed() + "%"
	}];

	$: {
		if (chart) {
			chart.data.datasets[0].data = [
				totals.wins?.innocent?.death || 0,
				totals.wins?.innocent?.timelimit || 0,
				totals.wins?.traitor?.death || 0
			];
			chart.update();
		}
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type: "pie",
			plugins: [ChartDataLabels],
			options: {
				backgroundColor: [
					"rgba(75, 192, 120, 0.2)",
					"rgba(213, 194, 43, 0.2)",
					"rgba(255, 99, 132, 0.2)"
				],
				borderColor: [
					"rgb(75, 192, 120)",
					"rgb(213, 194, 43)",
					"rgb(255, 99, 132)"
				],
				borderWidth: 2,
				plugins: {
					datalabels: {
						formatter(value) {
							return (value / totals.rounds * 100).toFixed() + "%";
						}
					}
				}
			},
			data: {
				labels: ["Innocent (death)", "Innocent (timelimit)", "Traitors (death)"],
				datasets: [{
					data: []
				}]
			}
		});
	});
</script>

<h2>Rounds</h2>
<div class="rounds">
	<div class="chart">
		<canvas bind:this={canvas}></canvas>
	</div>
	<table>
		{#each tableData as { key, value }}
		<tr>
			<th scope="row">{key}</th>
			<td>{value}</td>
		</tr>
		{/each}
	</table>
</div>

<style>
	.rounds {
		display: flex;
		justify-content: space-between;
	}
	.chart {
		width: 360px;
	}

	table td {
		padding: 0;
		padding-left: 0.5em;
	}
	table th[scope=row] {
		text-align: right;
		padding: 0;
		font-weight: 600;
	}
</style>
