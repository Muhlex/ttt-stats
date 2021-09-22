export function filterRounds(rounds, { minPlayers, maxPlayers, minDate, maxDate }) {
	return rounds.filter(({ players, date }) => {
		return (
			(typeof minPlayers !== "number" || players.length >= minPlayers) &&
			(typeof maxPlayers !== "number" || players.length <= maxPlayers) &&
			(minDate === null || isNaN(minDate) || date >= minDate) &&
			(maxDate === null || isNaN(maxDate) || date <= maxDate)
		);
	});
}

export function groupBy(category, array) {
	return array.reduce((objectsByCategory, obj) => {
		const value = typeof category === "string" ? obj[category] : category(obj);
		objectsByCategory[value] = (objectsByCategory[value] || []).concat(obj);
		return objectsByCategory;
	}, {});
}

export function getRoleTeam(role) {
	return role === "traitor" ? "traitor" : "innocent";
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

export function getRoundItemCounts(rounds) {
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

export function isPlayerInRounds(rounds, guid) {
	return rounds.findIndex(({ players }) => players.findIndex(p => p.guid === guid) > -1) > -1;
}

export function getPlayerRounds(rounds, guid) {
	return rounds
		.filter(({ players }) => players.findIndex(p => p.guid === guid) > -1)
		.map(round => ({ ...round, player: round.players.find(p => p.guid === guid) }));
}

export function getPlayerWonRounds(playerRounds) {
	return playerRounds.filter(({ player, outcome }) => {
		return getRoleTeam(player.role) === outcome.winner;
	});
}

export function getPlayerFirstDeathRounds(playerRounds) {
	return playerRounds.filter(({ events, player }) => {
		const deaths = events.filter(({ type }) => type === "death");
		return deaths.findIndex(({ victim }) => victim.guid === player.guid) === 0;
	});
}

export function getPlayerPlaytime(playerRounds) {
	return playerRounds.reduce((total, { outcome: { roundLength } }) => total + roundLength, 0);
}

export function getPlayerKills(playerRounds) {
	const guid = playerRounds[0]?.player.guid;

	const events = playerRounds.flatMap(({ events }) => {
		return events.filter(({ type }) => type === "death");
	});

	return events.filter(({ victim, attacker }) => {
		return attacker && attacker.guid === guid && attacker.guid !== victim.guid;
	});
}

export function getPlayerDeaths(playerRounds) {
	const guid = playerRounds[0]?.player.guid;

	const events = playerRounds.flatMap(({ events }) => {
		return events.filter(({ type }) => type === "death");
	});

	return events.filter(({ victim }) => {
		return victim.guid === guid;
	});
}

export function getPlayerKDR(kills, deaths) {
	return kills.length / (deaths.length || 1);
}

export function getPlayerAdjustedKDR(kills, deaths) {
	// friendly-fire kills count as deaths instead of kills
	const tk = getPlayerTeamKills(kills).length;
	const k = kills.length - tk;
	const d = deaths.length + tk;

	return k / (d || 1);
}

export function getPlayerHeadshotPercentage(kills) {
	const hitscanKills = kills.filter(({ means }) => {
		return ["MOD_PISTOL_BULLET", "MOD_RIFLE_BULLET", "MOD_HEAD_SHOT"].includes(means);
	});

	const headshotKills = hitscanKills.filter(({ means }) => means === "MOD_HEAD_SHOT");

	return headshotKills.length / (hitscanKills.length || 1);
}

export function getPlayerTeamKills(kills) {
	return kills.filter(({ victim, attacker }) => {
		return victim && getRoleTeam(victim.role) === getRoleTeam(attacker.role);
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

export function getPlayerItemCounts(rounds, guid) {
	const events = rounds.flatMap(({ events }) => {
		return events.filter(({ type, player }) => type === "item-buy" && player.guid === guid);
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
