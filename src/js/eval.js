export function groupBy(key, array) {
	return array.reduce((objectsByKeyValue, obj) => {
		const value = obj[key];
		objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
		return objectsByKeyValue;
	}, {});
}

export function getRoundTotals(rounds) {
	const reduced = rounds.reduce(
		(acc, round) => {
			const result = {
				playtime: acc.playtime + round.outcome.roundLength,
				wins: acc.wins
			};

			if (!result.wins[round.outcome.winner]) result.wins[round.outcome.winner] = {};
			const winnerObj = result.wins[round.outcome.winner];
			winnerObj[round.outcome.reason] = (winnerObj[round.outcome.reason] || 0) + 1;

			return result;
		},
		{ playtime: 0, wins: {} }
	);

	return {
		rounds: rounds.length || 0,
		...reduced,
		playtime: Math.floor(reduced.playtime)
	};
}

// probably unnecessary
export function getRoundMeans(totals) {
	const each = (obj, target) => {
		for (const key in obj) {
			if (typeof obj[key] === "object") {
				target[key] = {};
				each(obj[key], target[key]);
			} else {
				target[key] = obj[key] / totals.rounds;
			}
		}
	};
	const result = {};
	each(totals, result);
	return result;
}

export function getItemCounts(items) {
	const map = new Map();
	for (const item of items) {
		map.set(item.name, {
			count: (map.get(item.name)?.count || 0) + 1,
			role: item.role
		});
	}
	return [...map]
		.map(([name, data]) => ({ name, ...data }))
		.sort((a, b) => b.count - a.count);
}

export function filterRounds(rounds, { minPlayers, maxPlayers, minDate, maxDate }) {
	return rounds.filter(({ playerCounts, date }) => {
		return (
			(typeof minPlayers !== "number" || playerCounts.total >= minPlayers) &&
			(typeof maxPlayers !== "number" || playerCounts.total <= maxPlayers) &&
			(isNaN(minDate) || date >= minDate) &&
			(isNaN(maxDate) || date <= maxDate)
		);
	});
}
