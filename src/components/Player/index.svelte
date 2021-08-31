<script>
	import {
		groupBy,
		getPlayerRounds,
		getPlayerKills,
		getPlayerDeaths,
		getPlayerItemCounts
	} from "../../js/eval";

	import PlayerTable from "./Table.svelte";
	import Weapons from "./Weapons.svelte";
	import Items from "./Items.svelte";

	export let rounds, player;

	$: r = (() => {
		const any = getPlayerRounds(rounds, player.guid);
		return { any, innocent: [], traitor: [], detective: [], ...groupBy("role", any) };
	})();
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
	$: items = {
		traitor: [],
		detective: [],
		...groupBy("role", getPlayerItemCounts(r.any, player.guid))
	};
</script>

<h1>
	<span style="margin-right: 0.5em">{player.name}</span><small>{player.guid}</small>
</h1>

<div class="row">
	<div class="left">
		<PlayerTable rounds={r} {kills} {deaths} />
		<div class="items">
			<h2>Items</h2>
			<h3>Traitor</h3>
			<Items items={items.traitor} role="traitor" />
			<h3>Detective</h3>
			<Items items={items.detective} role="detective" />
		</div>
	</div>
	<div class="weapons">
		<h2>Weapons</h2>
		<Weapons {kills} />
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
		margin: 0 -1em;
	}
	.row > * { margin: 0 1em; }

	.left {
		overflow: hidden; /* somehow chart.js requires this */
		flex-basis: 500px;
		flex-grow: 1;
	}

	.weapons {
		overflow: hidden; /* somehow chart.js requires this */
		flex-grow: 2;
		flex-basis: 200px;
		min-width: 320px;
		max-width: 600px;
	}
</style>
