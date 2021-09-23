<script>
	import Leaderboard from "../components/Leaderboards/Leaderboard.svelte";

	$: leaderboards = [{
		title: "Kills",
		emoji: "⚔️"
	}, {
		title: "Deaths",
		emoji: "☠️"
	}, {
		title: "Explosive Kills",
		emoji: "💥"
	}, {
		title: "Kills on a Single Day",
		emoji: "⚔️"
	}, {
		title: "Suicides",
		emoji: "🙄"
	}, {
		title: "Chat Messages Sent",
		emoji: "💬"
	}, {
		title: "Revolver.",
		tooltip: "% of Kills achieved with .44 Magnum",
		emoji: "🔫"
	}, {
		title: "ATTACK HELICOPTER Suicides",
		emoji: "🚁"
	}, {
		title: "Least RADARs bought",
		tooltip: "As % of Traitor items bought by this player",
		emoji: "🛰️"
	}].map(board => ({ ...board, placements: [
		{ player: { name: "Joe3x" }, value: 1337 },
		{ player: { name: "murlis" }, value: 420 },
		{ player: { name: "5 Brote" }, value: 69 },
		{ player: { name: "mel" }, value: 42 },
		{ player: { name: "pako" }, value: 32 },
		{ player: { name: "marvbre" }, value: 16 }
	] }));

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
