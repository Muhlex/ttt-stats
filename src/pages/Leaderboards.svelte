<script>
	import { onMount, onDestroy } from "svelte";

	import { options } from "../js/eval";
	import Leaderboard from "../components/Leaderboards/Leaderboard.svelte";

	export let data;

	let resizeObserver, columnCount = 1, leaderboardsEl;

	onMount(() => {
		resizeObserver = new ResizeObserver(entry => {
			const width = entry[0].contentRect.width;
			columnCount = parseInt((width / 900) + 1);
		});
		resizeObserver.observe(leaderboardsEl);
	});

	onDestroy(() => {
		resizeObserver.disconnect();
	});

	function getBoardColumns(boards, columnCount) {
		return boards.reduce((r, board, i) => {
			r[i % columnCount].push(board);
			return r;
		}, [...Array(columnCount)].map(() => []));
	}

	$: leaderboardGroups = [{
		heading: "Kills",
		boards: [{
			title: "Kills",
			emoji: "⚔️",
			placements: data.kills
		}, {
			title: "Adjusted KDR",
			emoji: "➗",
			tooltip: "Enemy kills ÷ (Deaths + Teamkills)",
			placements: data.kdrAdjusted
		}, {
			title: "Headshot Kills",
			tooltip: "% of bullet weapon kills via headshots",
			emoji: "🤯",
			placements: data.headshotPct
		}, {
			title: "Neck-romancer",
			tooltip: "% of bullet weapon kills via shots in the neck<br>(deals no extra damage)",
			emoji: "🦒",
			placements: data.neckKillsPct
		}, {
			title: "Multi Kills",
			tooltip: "Times 2+ kills were achieved with < 5 seconds between each",
			emoji: "👥",
			placements: data.multiKills
		}, {
			title: "BOMB Multi-Kills",
			tooltip: "2+ kills with one explosion",
			emoji: "💣",
			placements: data.bombMultiKills
		}, {
			title: "Explosive Kills",
			emoji: "💥",
			placements: data.explosiveKills
		}, {
			title: "Environmental Kills",
			tooltip: "Kills with explosive barrels or cars",
			emoji: "🛢️",
			placements: data.environmentalKills
		}, {
			title: "ROCKET LAUNCHER Direct Hits",
			emoji: "🎯",
			placements: data.rpgDirectHitKills
		}, {
			title: "Revolver.",
			tooltip: "Kills achieved with .44 Magnum",
			emoji: "🔫",
			placements: data.revolverKills
		// }, {
		// 	title: "Kills on a Single Day",
		// 	emoji: "⚔️"
		// }, {
		// 	title: "King Slayer",
		// 	tooltip: "Kills against the player with the highest adjusted KDR",
		// 	emoji: "👑"
		}]
	}, {
		heading: "Deaths",
		boards: [{
			title: "Deaths",
			emoji: "☠️",
			placements: data.deaths
		}, {
			title: "Suicides",
			emoji: "🙄",
			placements: data.suicides
		}, {
			title: "Times Fallen to Death",
			emoji: "🪂",
			placements: data.fallingSuicides
		}, {
			title: "ATTACK HELICOPTER Suicides",
			emoji: "🚁",
			placements: data.attackHeliSuicides
		}]
	}, {
		heading: "Traitor Rounds",
		boards: [{
			title: "Early Finisher",
			tooltip: "Fastest round win as traitor",
			emoji: "⏱️",
			placements: data.traitorRoundWinTime
		}, {
			title: "Slowpoke",
			tooltip: "Traitor rounds lost by timelimit",
			emoji: "🐌",
			placements: data.traitorRoundsLostTimelimitCount
		}, {
			title: "Cheapskate",
			tooltip: "Traitor rounds won without spending any credits",
			emoji: "🤑",
			placements: data.traitorNoItemsWonRoundCount
		}, {
			title: "Least RADARs bought",
			tooltip: "As % of total traitor items bought by this player",
			emoji: "🛰️",
			placements: [...data.radarsBoughtPct].reverse()
		}, {
			title: "First Blood as Traitor",
			tooltip: "% of this player's traitor rounds where they made the first kill",
			emoji: "🩸",
			placements: data.traitorRoundsFirstBlood
		}, {
			title: "Most Traitor Aces",
			tooltip: "Rounds won by killing all innocent single-handedly",
			emoji: "🎖️",
			placements: data.traitorRoundsAced
		}]
	}, {
		heading: "Other",
		boards: [{
			title: "Chat Messages Sent",
			emoji: "💬",
			placements: data.chatMessages
		}]
	}];

	let extendedIndex = null;
</script>

<section class="leaderboards" bind:this={leaderboardsEl}>
	{#each leaderboardGroups as { heading, boards } }
		<h2>{heading}</h2>
		<div class="group">
			{#each getBoardColumns(boards, columnCount) as column}
				<div class="column">
					{#each column as board}
						<Leaderboard
						{...board}
						extended={extendedIndex === board}
						on:extend={({ detail: newState }) => {
							newState ? extendedIndex = board : extendedIndex = null;
						}}
						/>
					{/each}
				</div>
			{/each}
		</div>
	{/each}
	<p class="note">
		Players must have been active in the previous
		<strong>{options.leaderboards.maxDaysSinceLastSeen} days</strong> or have played at least
		<strong>{options.leaderboards.minRounds} rounds</strong> to be listed on the leaderboards.
	</p>
</section>

<style>
	section { margin-top: 2em }

	.group {
		display: flex;
	}

	.column { width: 100% }
	.column + .column { margin-left: 1em }

	.column > :global(* + *) { margin-top: 1em }

	.note {
		max-width: 30em;
		margin: 2em auto;
		text-align: center;
		font-style: italic;
		color: rgb(var(--col-accent));
	}
</style>
