<script>
	import { onMount } from "svelte";
	import Chart from "chart.js/auto";

	import { getWeaponDisplayName } from "../js/data/weapons";
	import {
		getPlayerRounds,
		getPlayerPlaytime,
		getPlayerKills,
		getPlayerDeaths,
		getPlayerHeadshotPercentage,
		getPlayerRoundsWon,
		getPlayerWeaponStats
	} from "../js/eval";

	export let rounds, player;

	let r;
	$: {
		const any = getPlayerRounds(rounds, player.guid);
		r = {
			any,
			innocent: any.filter(({ role }) => role === "innocent"),
			traitor: any.filter(({ role }) => role === "traitor"),
			detective: any.filter(({ role }) => role === "detective")
		};
	}
	$: playtime = {
		any: getPlayerPlaytime(r.any),
		innocent: getPlayerPlaytime(r.innocent),
		traitor: getPlayerPlaytime(r.traitor),
		detective: getPlayerPlaytime(r.detective)
	};
	$: kills = {
		any: getPlayerKills(r.any, player.guid),
		innocent: getPlayerKills(r.innocent, player.guid),
		traitor: getPlayerKills(r.traitor, player.guid),
		detective: getPlayerKills(r.detective, player.guid)
	};
	$: deaths = {
		any: getPlayerDeaths(r.any, player.guid),
		innocent: getPlayerDeaths(r.innocent, player.guid),
		traitor: getPlayerDeaths(r.traitor, player.guid),
		detective: getPlayerDeaths(r.detective, player.guid)
	};

	$: tableData = [{
		key: "Rounds played",
		row: [
			r.innocent.length,
			r.traitor.length,
			r.detective.length,
			r.innocent.length + r.detective.length,
			r.any.length
		]
	}, {
		key: "Playtime",
		row: [
			playtime.innocent,
			playtime.traitor,
			playtime.detective,
			playtime.innocent + playtime.detective,
			playtime.any
		].map(value => `${(value / 60 / 60).toFixed(1)} h`)
	}, {
		key: "Kills",
		row: [
			kills.innocent,
			kills.traitor,
			kills.detective,
			[...kills.innocent, ...kills.detective],
			kills.any
		].map(value => value.length)
	}, {
		key: "Deaths",
		row: [
			deaths.innocent,
			deaths.traitor,
			deaths.detective,
			[...deaths.innocent, ...deaths.detective],
			deaths.any
		].map(value => value.length)
	}, {
		key: "K/D Ratio",
		row: [
			kills.innocent.length / (deaths.innocent.length || 1),
			kills.traitor.length / (deaths.traitor.length || 1),
			kills.detective.length / (deaths.detective.length || 1),
			(kills.innocent.length + kills.detective.length) /
				((deaths.innocent.length + deaths.detective.length) || 1),
			kills.any.length / (deaths.any.length || 1)
		].map(value => value.toFixed(2))
	}, {
		key: "Headshot Kills",
		row: [
			getPlayerHeadshotPercentage(kills.innocent),
			getPlayerHeadshotPercentage(kills.traitor),
			getPlayerHeadshotPercentage(kills.detective),
			getPlayerHeadshotPercentage([...kills.innocent, ...kills.detective]),
			getPlayerHeadshotPercentage(kills.any)
		].map(value => `${(value * 100).toFixed()}%`)
	}, {
		key: "Rounds Won",
		row: [
			getPlayerRoundsWon(r.innocent).length / r.innocent.length,
			getPlayerRoundsWon(r.traitor).length / r.traitor.length,
			getPlayerRoundsWon(r.detective).length / r.detective.length,
			getPlayerRoundsWon([...r.innocent, ...r.detective]).length /
				(r.innocent.length + r.detective.length),
			getPlayerRoundsWon(r.any).length / r.any.length
		].map(value => `${(value * 100).toFixed()}%`)
	}];

	let weaponsCanvas, weaponsChart;

	$: weaponStats = getPlayerWeaponStats(kills.any);
	$: {
		if (weaponsChart) {
			weaponsChart.data.labels = weaponStats.map(({ name }) => getWeaponDisplayName(name));
			weaponsChart.data.datasets[0].data = weaponStats.map(({ kills }) => kills);
			weaponsChart.update();
		}
	}

	onMount(() => {
		weaponsChart = new Chart(weaponsCanvas, {
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

<h1>
	<span style="margin-right: 0.5em">{player.name}</span><small>{player.guid}</small>
</h1>

<div class="row">
	<table>
		<thead>
			<tr>
				<th scope="col"></th>
				<th scope="col"><span class="i" aria-label="Innocent" /></th>
				<th scope="col"><span class="t" aria-label="Traitor" /></th>
				<th scope="col"><span class="d" aria-label="Detective" /></th>
				<th scope="col"><span class="i" aria-label="Innocent" /><span class="d" aria-label="Detective" /></th>
				<th scope="col">Total</th>
			</tr>
		</thead>
		<tbody>
			{#each tableData as { key, row }}
				<tr>
					<th scope="row">{key}</th>
					{#each row as value}
						<td>{value}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="weapons">
		<h2>Weapons</h2>
		<div class="chart-weapons">
			<div class="middle">
				{#if weaponStats.length}
					Favorite weapon:<br>
					<div class="weapon">{getWeaponDisplayName(weaponStats[0].name)}</div>
				{/if}
			</div>
			<canvas bind:this={weaponsCanvas}></canvas>
		</div>
	</div>
</div>

<style>
	small {
		font-weight: normal;
		font-size: 0.5em;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	table {
		border-collapse: collapse;
		flex-shrink: 0;
		margin-bottom: 1em;
		margin-right: 1em;
	}

	table td,
	table th {
		padding: 0.4em 1.2em;
	}
	table td:nth-child(even),
	table th:nth-child(even) {
		background-color: var(--bg1);
	}
	table td {
		text-align: center;
	}
	table th[scope=row] {
		padding: 0;
		padding-right: 0.5em;
		text-align: right;
		font-weight: 600;
	}

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

	.i, .t, .d {
		position: relative;
		display: inline-block;
		width: 1em;
		height: 1em;
		margin: 0 0.1em;
		border-radius: 50%;
		color: white;
	}
	.i::before, .t::before, .d::before {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		font-size: 0.625em;
	}
	.i { background-color: var(--i) }
	.i::before { content: 'I'; }
	.t { background-color: var(--t) }
	.t::before { content: 'T'; }
	.d { background-color: var(--d) }
	.d::before { content: 'D'; }
</style>
