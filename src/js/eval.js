export function filterRounds(rounds, { minPlayers, maxPlayers, minDate, maxDate }) {
	return rounds.filter(({ players, date }) => {
		return (
			(typeof minPlayers !== "number" || players.length >= minPlayers) &&
			(typeof maxPlayers !== "number" || players.length <= maxPlayers) &&
			(isNaN(minDate) || date >= minDate) &&
			(isNaN(maxDate) || date <= maxDate)
		);
	});
}

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

export function getItemCounts(rounds) {
	const events = rounds.flatMap(({ events }) => {
		return events.filter(({ type }) => type === "item-buy");
	});

	const map = new Map();
	for (const event of events) {
		map.set(event.item, {
			count: (map.get(event.item)?.count || 0) + 1,
			role: event.player.role
		});
	}

	return [...map]
		.map(([name, data]) => ({ name, ...data }))
		.sort((a, b) => b.count - a.count);
}

export function getPlayerRounds(rounds, guid) {
	return rounds
		.filter(({ players }) => players.findIndex(p => p.guid === guid) > -1)
		.map(round => ({ ...round, role: round.players.find(p => p.guid === guid).role }));
}

export function getPlayerPlaytime(playerRounds) {
	return playerRounds.reduce((total, { outcome: { roundLength } }) => total + roundLength, 0);
}

export function getPlayerKills(rounds, guid) {
	const events = rounds.flatMap(({ events }) => {
		return events.filter(({ type }) => type === "death");
	});

	return events.filter(({ victim, attacker }) => {
		return attacker && attacker.guid === guid && attacker.guid !== victim.guid;
	});
}

export function getPlayerDeaths(rounds, guid) {
	const events = rounds.flatMap(({ events }) => {
		return events.filter(({ type }) => type === "death");
	});

	return events.filter(({ victim }) => {
		return victim.guid === guid;
	});
}

export function getPlayerHeadshotPercentage(kills) {
	const hitscanKills = kills.filter(({ means }) => {
		return ["MOD_PISTOL_BULLET", "MOD_RIFLE_BULLET", "MOD_HEAD_SHOT"].includes(means);
	});

	const headshotKills = hitscanKills.filter(({ means }) => means === "MOD_HEAD_SHOT");

	return headshotKills.length / (hitscanKills.length || 1);
}

export function getPlayerRoundsWon(playerRounds) {
	return playerRounds.filter(({ role, outcome }) => {
		const playerTeam = role === "traitor" ? "traitor" : "innocent";
		return playerTeam === outcome.winner;
	});
}

export function getPlayerWeaponStats(kills) {
	const map = new Map();
	for (const kill of kills) {
		map.set(kill.weapon, {
			kills: (map.get(kill.weapon)?.kills || 0) + 1
		});
	}

	return [...map]
		.map(([name, data]) => ({ name, ...data }))
		.sort((a, b) => b.kills - a.kills);
}
