<script>
	import { Route } from "svelte-navigator";
	import Link from "../components/Link.svelte";
	import Player from "../components/Player/index.svelte";

	import { isPlayerInRounds } from "../js/eval";

	export let rounds, players;

	$: playerList = [...players.values()]
		.filter(({ isBot }) => !isBot)
		.sort((a, b) => a.name < b.name ? -1 : 1);
</script>

<h2>Players</h2>
<div class="player-list">
	{#each playerList as player}
		<Link to={player.guid} class={!isPlayerInRounds(rounds, player.guid) && "no-data"}>
			{player.name}
		</Link>
	{/each}
</div>

<Route path="/" primary={false}>
	<div class="select">
		Select a player...
	</div>
</Route>
<Route path=":guid" let:params>
	<Player {rounds} player={players.get(params.guid)} />
</Route>

<style>
	.player-list {
		display: flex;
		flex-wrap: wrap;
		margin: -0.5em;
	}
	.player-list :global(a) {
		text-decoration: none;
		color: inherit;
		flex-grow: 1;
		text-align: center;

		margin: 0.5em;
		padding: 1em 1.5em;
		background-color: var(--bg1);
		font-weight: 600;

		transition: 300ms ease;
		transition-property: color, background-color;
	}
	.player-list :global(a):hover {
		background-color: var(--hover);
	}
	.player-list :global(a.active) {
		background-color: var(--active);
		color: var(--bg);
	}
	.player-list :global(a.no-data) {
		opacity: 0.5;
	}
	.player-list::after {
		content: '';
		flex-grow: 99999999999;
	}

	.select {
		padding: 1em 0;
		display: flex;
		justify-content: center;
		text-align: center;
	}
</style>
