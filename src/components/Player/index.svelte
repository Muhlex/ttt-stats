<script>
	import PlayerTable from "./Table.svelte";
	import Weapons from "./Weapons.svelte";
	import Items from "./Items.svelte";

	export let evalData, guid;

	$: player = evalData.players.find(p => p.guid === guid);
</script>

<h1>
	<span style="margin-right: 0.5em">{player.name}</span><small>{player.guid}</small>
</h1>

<div class="row">
	<div class="left">
		<PlayerTable {player} />
		<div class="items">
			<h2>Items</h2>
			<h3>Traitor</h3>
			<Items items={player.stats.items.traitor} role="traitor" />
			<h3>Detective</h3>
			<Items items={player.stats.items.detective} role="detective" />
		</div>
	</div>
	<div class="weapons">
		<h2>Weapons</h2>
		<Weapons weapons={player.stats.weapons} kills={player.stats.kills} />
	</div>
</div>


<style>
	h1 { margin-top: 1em }

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

	.items {
		margin: 2em 0;
	}

	.weapons {
		overflow: hidden; /* somehow chart.js requires this */
		flex-grow: 2;
		flex-basis: 200px;
		min-width: 320px;
		max-width: 600px;
	}
</style>
