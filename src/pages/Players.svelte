<script>
	import { Route } from "svelte-navigator";
	import Link from "../components/Link.svelte";
	import Player from "../components/Player/index.svelte";

	export let evalData;
</script>

<section class="players">
	<h2>Players</h2>
	<div class="player-list">
		{#each evalData.players as player}
			<Link to={player.guid} class={!player.inRounds && "no-data"}>
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
		<Player {evalData} guid={params.guid} />
	</Route>
</section>

<style>
	section { margin-top: 2em }

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
		background-color: rgb(var(--col-bg1));
		font-weight: 600;

		transition: 300ms ease;
		transition-property: color, background-color;
	}
	.player-list :global(a):hover,
	.player-list :global(a):focus-visible {
		background-color: rgb(var(--col-hover));
		color: rgb(var(--col-bg));
	}
	.player-list :global(a.active) {
		background-color: rgb(var(--col-active));
		color: rgb(var(--col-bg));
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
