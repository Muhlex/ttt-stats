export function getDate(text) {
	const timestamp = text.match(/TTT_ROUND_START;\d*;\d*;\d*;(\d+)/);
	if (!timestamp) return null;
	else return new Date(Number(timestamp[1]) * 1000);
}

export function getPlayerCounts(text) {
	let playerCounts = text.match(/TTT_ROUND_START;(\d*);(\d*);(\d*)/);
	if (!playerCounts) return null;
	playerCounts = playerCounts.slice(1).map(count => Number(count));
	if (playerCounts[0] < 1) return null;

	return {
		total: playerCounts[0],
		innocent: playerCounts[0] - playerCounts[1] - playerCounts[2],
		traitor: playerCounts[1],
		detective: playerCounts[2]
	};
}

export function getPlayers(text, playersMap) {
	const players = [...text.matchAll(/J;(.*?);/g)];
	return players.map(([, guid]) => {
		const meta = playersMap.get(guid);
		return {
			guid,
			meta
		};
	});
}

export function getItems(text) {
	const items = [...text.matchAll(/TTT_ITEM_BOUGHT;(.*?);(.*?);(.*?);(.*)/g)];
	return items.map(item => ({
		name: item[4],
		role: item[3],
		player: item[1]
	}));
}

export function getOutcome(text) {
	const outcome = text.match(/TTT_ROUND_END;(.*?);(.*?);(.*);*/);
	if (!outcome) return null;

	return {
		winner: outcome[1],
		reason: outcome[2],
		roundLength: Number(outcome[3])
	};
}
