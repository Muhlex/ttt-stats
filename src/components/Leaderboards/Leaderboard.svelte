<script>
	import { createEventDispatcher } from "svelte";

	import Tooltip from "../Tooltip.svelte";

	const dispatch = createEventDispatcher();

	export let title, tooltip, emoji, placements;
	export let extended;
</script>

<button
	class="leaderboard"
	class:extended
	on:click={dispatch("extend", !extended)}
>
	<h2>
		{#if tooltip}
			<Tooltip text={tooltip}>
				<span class="title">{title}</span>
			</Tooltip>
		{:else}
			<span class="title">{title}</span>
		{/if}
		{#if emoji}
			<span class="emoji">{emoji}</span>
		{/if}
	</h2>
	<div class="placements">
		<div class="podium">
			{#each placements.slice(0, 3) as { player, value }, i}
				<div class="placement">
					<span class="index">{["🥇", "🥈", "🥉"][i]}</span>
					<span class="name">{player.name}:</span>
					<span class="value">{value}<span>
				</div>
			{/each}
		</div>
		{#if extended}
			<div class="other">
				{#each placements.slice(3) as { player, value }, i}
					<div class="placement">
						<span class="index">{i + 4}.</span>
						<span class="name">{player.name}</span>
						<span class="value">{value}<span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</button>

<style>
	.leaderboard {
		display: block;
		width: 100%;
		font-size: inherit;
		text-align: left;
		user-select: auto;

		max-width: 800px;
		margin: 0 auto;
		margin-bottom: 1em;

		padding: 1em;
		color: rgb(var(--col-text));
		background-color: rgb(var(--col-bg1));
		border: 2px solid transparent;

		transition: background-color 200ms ease;
	}
	.leaderboard h2 {
		transition: color 200ms ease;
	}
	.leaderboard:hover,
	.leaderboard:focus-visible {
		background-color: rgb(var(--col-hover));
	}
	.leaderboard.extended {
		background-color: rgb(var(--col-active));
	}
	.leaderboard:hover h2,
	.leaderboard:focus-visible h2,
	.leaderboard.extended h2 {
		color: rgb(var(--col-bg))
	}

	.leaderboard h2 {
		display: flex;
		justify-content: space-between;
	}

	.placements {
		background-color: rgb(var(--col-bg));
		margin: 0 -1em -1em;
	}

	.placement {
		padding: 1em;
		width: 100%;
	}
	.placement .value {
		font-weight: 600;
	}

	.podium {
		display: flex;
	}

	.podium .placement + .placement {
		border-left: 2px solid rgb(var(--col-bg1));
	}

	.podium .value {
		margin-left: 0.5em;
	}

	.other {
		display: table;
		border-collapse: collapse;
		width: 100%;
	}

	.other .placement {
		display: table-row;
		border-top: 2px solid rgb(var(--col-bg1));
	}
	.other .placement > * {
		display: table-cell;
		padding: 0.5em 1em;
	}

	.other .index {
		display: table-cell;
		text-align: right;
		min-width: 3ch;
		font-weight: bold;
	}
	.other .name {
		width: 50%;
	}
	.other .value {
		text-align: right;
		width: 50%;
	}
</style>
