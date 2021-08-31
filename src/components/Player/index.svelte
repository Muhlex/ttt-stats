<script>
	import {
		getPlayerRounds,
		getPlayerKills,
		getPlayerDeaths
	} from "../../js/eval";

	import PlayerTable from "./Table.svelte";
	import Weapons from "./Weapons.svelte";

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
</script>

<h1>
	<span style="margin-right: 0.5em">{player.name}</span><small>{player.guid}</small>
</h1>

<div class="row">
	<PlayerTable rounds={r} {kills} {deaths} />
	<Weapons {kills} />
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
</style>
