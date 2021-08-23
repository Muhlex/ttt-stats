<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";

	export let items;

	let canvas;
	let chart;
	let role;

	$: {
		if (chart && role) {
			chart.data.labels = [];
			chart.data.datasets[0].data = items[role];
			chart.update();
		}
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type: "bar",
			options: {
				indexAxis: "y",
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
				borderWidth: 1.5
			},
			data: {
				datasets: [
					{
						data: [],
						label: "times bought",
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
