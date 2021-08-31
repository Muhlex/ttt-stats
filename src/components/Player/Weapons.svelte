<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";

	import { getPlayerWeaponStats } from "../../js/eval";
	import { getWeaponDisplayName } from "../../js/data/weapons";

	export let kills;

	let canvas, chart;

	$: weaponStats = getPlayerWeaponStats(kills.any);
	$: {
		if (chart) {
			chart.data.labels = weaponStats.map(({ name }) => getWeaponDisplayName(name));
			chart.data.datasets[0].data = weaponStats.map(({ kills }) => kills);
			chart.update();
		}
	}

	onMount(() => {
		chart = new Chart(canvas, {
			type: "doughnut",
			options: {
				plugins: {
					legend: {
						display: false
					}
				},
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
				borderWidth: 2
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

<div class="weapons">
	<h2>Weapons</h2>
	<div class="chart-weapons">
		<div class="middle">
			{#if weaponStats.length}
				Favorite weapon:<br>
				<div class="weapon">{getWeaponDisplayName(weaponStats[0].name)}</div>
			{/if}
		</div>
		<canvas bind:this={canvas}></canvas>
	</div>
</div>

<style>
	.weapons {
		flex-grow: 1;
		flex-basis: 200px;
		min-width: 320px;
		max-width: 600px;
		overflow: hidden; /* somehow chart.js requires this */
	}

	.chart-weapons {
		position: relative;
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
