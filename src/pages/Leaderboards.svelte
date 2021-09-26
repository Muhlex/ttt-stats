<script>
	import Leaderboard from "../components/Leaderboards/Leaderboard.svelte";

	export let data;

	$: console.log(data);

	$: leaderboards = [{
		title: "Kills",
		emoji: "⚔️",
		placements: data.kills
	}, {
		title: "Deaths",
		emoji: "☠️",
		placements: data.deaths
	}, {
		title: "Adjusted KDR",
		emoji: "➗",
		tooltip: "Enemy kills ÷ (Deaths + Teamkills)",
		placements: data.kdrAdjusted
	}, {
		title: "Headshots",
		emoji: "🤯",
		placements: data.headshotPct
	}, {
		title: "Neck-romancer",
		tooltip: "% of bullet weapon kills via shots in the neck<br>(deals no extra damage)",
		emoji: "🦒",
		placements: data.neckKillsPct
	}, {
	// 	title: "Kills on a Single Day",
	// 	emoji: "⚔️"
	// }, {
		title: "Explosive Kills",
		emoji: "💥",
		placements: data.explosiveKills
	}, {
		title: "Suicides",
		emoji: "🙄",
		placements: data.suicides
	}, {
		title: "ATTACK HELICOPTER Suicides",
		emoji: "🚁",
		placements: data.attackHeliSuicides
	}, {
		title: "Chat Messages Sent",
		emoji: "💬",
		placements: data.chatMessages
	}, {
		title: "Revolver.",
		tooltip: "% of kills achieved with .44 Magnum",
		emoji: "🔫",
		placements: data.revolverKills
	}, {
		title: "Least RADARs bought",
		tooltip: "As % of total traitor items bought by this player",
		emoji: "🛰️",
		placements: [...data.radarsBoughtPct].reverse()
	}, {
		title: "Cheapskate",
		tooltip: "Traitor rounds won without spending any credits",
		emoji: "🤑",
		placements: data.noItemsWonRoundCount
	// }, {
	// 	title: "BOMB Multi-Kills",
	// 	tooltip: "2+ kills with one explosion",
	// 	emoji: "💣"
	// }, {
	// 	title: "Fastest Traitor Round Win",
	// 	emoji: "⏱️"
	// }, {
	// 	title: "Slowpoke",
	// 	tooltip: "% of traitor rounds lost by timelimit",
	// 	emoji: "🐌"
	// }, {
	// 	title: "Neck-romancer",
	// 	tooltip: "% of bullet weapon kills via shots in the neck<br>(deals no extra damage)",
	// 	emoji: "🦒"
	// }, {
	// 	title: "King Slayer",
	// 	tooltip: "Kills against the player with the highest adjusted KDR",
	// 	emoji: "👑"
	// }, {
	// 	title: "ROCKET LAUNCHER Direct Hits",
	// 	emoji: "🎯"
	// }, {
	// 	title: "Times Fallen to Death",
	// 	emoji: "🪂"
	}];

	let extendedBoard = -1;
</script>

<h2>Leaderboards</h2>
<div class="leaderboards">
	{#each leaderboards as board, i}
		<Leaderboard
			{...board}
			extended={extendedBoard === i}
			on:extend={({ detail: newState }) => newState ? (extendedBoard = i) : (extendedBoard = -1)}
		/>
	{/each}
</div>
