<script>
	import Tooltip from "../../components/Tooltip.svelte";

	export let player;

	function toTableArray(groups) {
		return [
			groups.innocent,
			groups.traitor,
			groups.detective,
			groups.innocentTeam,
			groups.any
		];
	}

	$: tableData = [{
		key: "Playtime",
		row: toTableArray(player.stats.playtime)
			.map(value => `${(value / 60 / 60).toFixed(1)} h`)
	}, {
		key: "Rounds played",
		row: toTableArray(player.rounds)
			.map(rounds => rounds.length)
	}, {
		key: "Rounds won",
		row: toTableArray(
			Object.fromEntries(
				Object.keys(player.rounds)
					.map(k => [k, player.stats.roundsWon[k].length / (player.rounds[k].length || 1)])
			)
		).map(value => `${(value * 100).toFixed()}%`)
	}, {
		key: "Rounds survived",
		row: toTableArray(
			Object.fromEntries(
				Object.keys(player.rounds)
					.map(k => [k, player.stats.roundsSurvived[k].length / (player.rounds[k].length || 1)])
			)
		).map(value => `${(value * 100).toFixed()}%`)
	}, {
		key: "Rounds died first",
		row: toTableArray(
			Object.fromEntries(
				Object.keys(player.rounds)
					.map(k => [k, player.stats.roundsDiedFirst[k].length / (player.rounds[k].length || 1)])
			)
		).map(value => `${(value * 100).toFixed()}%`)
	}, {
		key: "Kills",
		row: toTableArray(player.stats.kills).map(kills => kills.length)
	}, {
		key: "Deaths",
		row: toTableArray(player.stats.deaths).map(deaths => deaths.length)
	}, {
		key: "K/D Ratio",
		row: toTableArray(player.stats.kdr)
			.map(kdr => kdr.toFixed(2))
	}, {
		key: "Adjusted KDR",
		row: toTableArray(player.stats.kdrAdjusted)
			.map(kdr => kdr.toFixed(2)),
		tooltip: "Friendly-fire kills instead count as deaths"
	}, {
		key: "Headshot Kills",
		row: toTableArray(player.stats.headshotPct)
			.map(value => `${(value * 100).toFixed()}%`)
	}, {
		key: "Team Kills",
		row: toTableArray(
			Object.fromEntries(
				Object.keys(player.stats.kills)
					.map(k => [k, player.stats.teamKills[k].length / (player.stats.kills[k].length || 1)])
			)
		).map(value => `${(value * 100).toFixed(1)}%`)
	}];
</script>

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
		{#each tableData as { key, row, tooltip }}
			<tr>
				<th scope="row">
					{#if tooltip}
						<Tooltip text={tooltip}>{key}</Tooltip>
					{:else}
						{key}
					{/if}
				</th>
				{#each row as value}
					<td>{value}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
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
		background-color: rgb(var(--col-bg1));
	}
	table td {
		text-align: center;
		font-variant-numeric: tabular-nums;
	}
	table th[scope=row] {
		padding: 0;
		padding-right: 0.5em;
		text-align: right;
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
	.i { background-color: rgb(var(--col-i)) }
	.i::before { content: 'I'; }
	.t { background-color: rgb(var(--col-t)) }
	.t::before { content: 'T'; }
	.d { background-color: rgb(var(--col-d)) }
	.d::before { content: 'D'; }
</style>
