<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";

	export let items;

	let canvas;
	let chart;
	const roles = ["traitor", "detective"];
	let role = roles[0];

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
<div class="item-select-role" aria-label="Select role">
	{#each roles as r}
		<button
			on:click={() => (role = r)}
			style={
				`--col-btn-bg: ${chartColors[r][0]};` +
				`--col-btn-bg-hover: ${chartColors[r][1]};`
			}
			class:active={role === r}
		>
			{r.charAt(0).toUpperCase() + r.slice(1)}
		</button>
	{/each}
</div>

<div class="chart">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.chart {
		margin-bottom: 1em;
	}
	.item-select-role {
		display: flex;
		justify-content: flex-end;
	}
	.item-select-role button {
		flex-basis: 10%;

		border: none;
		border-radius: 0;
		margin: 0;
		font-size: inherit;
		text-decoration: none;
		appearance: none;

		padding: 1em 1.5em;
		font-weight: 600;

		color: rgb(var(--col-bg));
		background-color: rgb(var(--col-accent));

		transition: 300ms ease;
		transition-property: background-color;
	}
	.item-select-role button:hover {
		background-color: rgb(var(--col-btn-bg-hover));
	}
	.item-select-role button.active {
		background-color: rgb(var(--col-btn-bg));
	}
	.item-select-role button:disabled {
		opacity: 0.5;
	}
</style>
