<script>
	import { createEventDispatcher } from "svelte";
	import { slide } from "svelte/transition";

	import Tooltip from "../Tooltip.svelte";

	const dispatch = createEventDispatcher();

	export let title, tooltip = null, emoji = null, placements = [];
	export let extended;

	function getPlacement(index, placements) {
		const value = placements[index].value;
		let i = placements.slice(0, index).findIndex(p => value === p.value);
		if (i === -1) i = index;

		return i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1 + ".";
	}
</script>

<button
	class="leaderboard"
	class:extended
	on:click={() => dispatch("extend", !extended)}
>
	<h3>
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
	</h3>
	<div class="placements">
			{#if placements.length}
				{#if !extended}
					<div class="podium" transition:slide|local>
						{#each placements.slice(0, 3) as { player, value }, i}
							<div class="placement">
								<span class="place">{getPlacement(i, placements)}</span>
								<span class="name">{player.name}</span>
								<span class="value">{value}<span>
							</div>
						{/each}
					</div>
				{:else}
					<div class="other" transition:slide|local>
						{#each placements as { player, value }, i}
							<div class="placement">
								<span class="place">{getPlacement(i, placements)}</span>
								<span class="name">{player.name}</span>
								<span class="value">{value}<span>
							</div>
						{/each}
					</div>
				{/if}
			{:else}
				<div class="no-data">
					No data available.
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

		padding: 1em;
		color: rgb(var(--col-text));
		background-color: rgb(var(--col-bg1));
		border: 2px solid transparent;

		scroll-margin-bottom: 128px;

		transition: background-color 200ms ease;
	}
	.leaderboard h3 {
		margin: 0;
		transition: color 200ms ease;
	}
	.leaderboard:hover,
	.leaderboard:focus-visible {
		background-color: rgb(var(--col-hover));
	}
	.leaderboard.extended {
		background-color: rgb(var(--col-active));
	}
	.leaderboard:hover h3,
	.leaderboard:focus-visible h3,
	.leaderboard.extended h3 {
		color: rgb(var(--col-bg))
	}

	.leaderboard h3 {
		display: flex;
		justify-content: space-between;
	}

	.placements {
		background-color: rgb(var(--col-bg));
		margin: 1em -1em -1em;
	}

	.placement {
		padding: 1em;
		width: 100%;
	}
	.placement .place {
		font-variant-numeric: oldstyle-nums;
	}
	.placement .name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.placement .value {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.podium {
		display: flex;
	}
	.podium .placement {
		display: inline-flex;
	}
	.podium .placement + .placement {
		border-left: 2px solid rgb(var(--col-bg1));
	}
	.podium .place {
		margin-right: 0.5em;
	}
	.podium .name {
		margin-right: 0.5em;

		flex-grow: 1;
		width: 0;
	}
	.podium .value {
		margin-left: auto;
	}

	.other {
		/* display: table; */
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
	.other .place {
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

	.no-data {
		padding: 1em;
		font-style: italic;
	}
</style>
