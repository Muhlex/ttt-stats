<script>
	import {
		getPlayerPlaytime,
		getPlayerWonRounds,
		getPlayerKDR,
		getPlayerAdjustedKDR,
		getPlayerHeadshotPercentage,
		getPlayerTeamKills,
		getPlayerFirstDeathRounds
	} from "../../js/eval";

	import Tooltip from "../../components/Tooltip.svelte";

	export let rounds, kills, deaths;

	function groupForTableColumns(stat) {
		return [
			stat.innocent,
			stat.traitor,
			stat.detective,
			[...stat.innocent, ...stat.detective],
			stat.any
		];
	}

	$: grouped = {
		rounds: groupForTableColumns(rounds),
		kills: groupForTableColumns(kills),
		deaths: groupForTableColumns(deaths)
	};

	$: groupCount = grouped.rounds.length;

	$: tableData = [{
		key: "Playtime",
		row: grouped.rounds
			.map(rounds => getPlayerPlaytime(rounds))
			.map(value => `${(value / 60 / 60).toFixed(1)} h`)
	}, {
		key: "Rounds played",
		row: grouped.rounds.map(rounds => rounds.length)
	}, {
		key: "Rounds won",
		row: grouped.rounds
			.map(rounds => getPlayerWonRounds(rounds).length / rounds.length)
			.map(value => `${(value * 100).toFixed()}%`)
	}, {
		key: "Kills",
		row: grouped.kills.map(value => value.length)
	}, {
		key: "Deaths",
		row: grouped.deaths.map(value => value.length)
	}, {
		key: "K/D Ratio",
		row: (() => {
			const result = [];
			for (let i = 0; i < groupCount; i++) {
				result.push(getPlayerKDR(grouped.kills[i], grouped.deaths[i]).toFixed(2));
			}
			return result;
		})()
	}, {
		key: "Adjusted KDR",
		row: (() => {
			const result = [];
			for (let i = 0; i < groupCount; i++) {
				result.push(getPlayerAdjustedKDR(grouped.kills[i], grouped.deaths[i]).toFixed(2));
			}
			return result;
		})(),
		tooltip: "Friendly-fire kills instead count as deaths"
	}, {
		key: "Headshot Kills",
		row: grouped.kills
			.map(kills => getPlayerHeadshotPercentage(kills))
			.map(value => `${(value * 100).toFixed()}%`)
	}, {
		key: "Team Kills",
		row: grouped.kills
			.map(kills => getPlayerTeamKills(kills).length / (kills.length || 1))
			.map(value => `${(value * 100).toFixed(1)}%`)
	}, {
		key: "First Deaths",
		row: grouped.rounds
			.map(rounds => getPlayerFirstDeathRounds(rounds).length / (rounds.length || 1))
			.map(value => `${(value * 100).toFixed(1)}%`)
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
