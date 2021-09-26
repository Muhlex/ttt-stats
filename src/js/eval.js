import { groupBy } from "./util";

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

// TODO: Use a Web Worker for this
export function evalRounds(rounds, players) {
	const playerData = evalPlayers(rounds, players);
	return {
		rounds,
		totals: getRoundTotals(rounds),
		items: getRoundItems(rounds),
		players: playerData,
		leaderboards: evalLeaderboards(playerData)
	};
}

function evalPlayers(rounds, players) {
	return players.map(p => {
		const getGroupedValue = (fun, argsGrouped) => {
			const groupKeys = Object.keys(argsGrouped[0]);
			return Object.fromEntries(
				groupKeys.map(k => [k, fun(...argsGrouped.map(argGrouped => argGrouped[k]))])
			);
		};

		const playedRounds = getPlayerRounds(rounds, p.guid);
		const playedRoundsGrouped = (() => {
			const result = {
				any: playedRounds,
				innocent: [],
				traitor: [],
				detective: [],
				...groupBy((({ player }) => player.role), playedRounds)
			};
			result.innocentTeam = [...result.innocent, ...result.detective];
			return result;
		})();

		const kills = getGroupedValue(getPlayerKills, [playedRoundsGrouped]);
		const hitscanKills = getGroupedValue(getPlayerHitscanKills, [kills]);
		const deaths = getGroupedValue(getPlayerDeaths, [playedRoundsGrouped]);

		return {
			...p,
			rounds: playedRoundsGrouped,
			inRounds: isPlayerInRounds(playedRounds, p.guid),
			stats: {
				kills,
				hitscanKills,
				deaths,
				playtime: getGroupedValue(getPlayerPlaytime, [playedRoundsGrouped]),
				roundsWon: getGroupedValue(getPlayerRoundsWon, [playedRoundsGrouped]),
				roundsSurvived: getGroupedValue(getPlayerRoundsSurvived, [playedRoundsGrouped]),
				roundsDiedFirst: getGroupedValue(getPlayerRoundsDiedFirst, [playedRoundsGrouped]),
				kdr: getGroupedValue(getPlayerKDR, [kills, deaths]),
				kdrAdjusted: getGroupedValue(getPlayerAdjustedKDR, [kills, deaths]),
				headshotPct: getGroupedValue(getPlayerHeadshotPercentage, [hitscanKills]),
				teamKills: getGroupedValue(getPlayerTeamKills, [kills]),
				explosiveKills: getGroupedValue(getPlayerExplosiveKills, [kills]),
				multiKills: getGroupedValue(getPlayerMultiKills, [playedRoundsGrouped]),
				suicides: getGroupedValue(getPlayerSuicides, [deaths]),
				chatMessages: getGroupedValue(getPlayerChatMessages, [playedRoundsGrouped]),
				items: {
					traitor: [],
					detective: [],
					...groupBy("role", getPlayerItems(playedRounds, p.guid))
				},
				weapons: getPlayerWeaponStats(kills.any)
			}
		};
	});
}

function evalLeaderboards(players) {
	return {
		kills: [...players]
			.filter(player => player.stats.kills.any.length > 0)
			.sort((a, b) => b.stats.kills.any.length - a.stats.kills.any.length)
			.map(player => ({ player, value: player.stats.kills.any.length })),
		deaths: [...players]
			.filter(player => player.stats.deaths.any.length > 0)
			.sort((a, b) => b.stats.deaths.any.length - a.stats.deaths.any.length)
			.map(player => ({ player, value: player.stats.deaths.any.length })),
		kdrAdjusted: [...players]
			.filter(player => player.stats.kills.any.length > 0)
			.sort((a, b) => b.stats.kdrAdjusted.any - a.stats.kdrAdjusted.any)
			.map(player => ({ player, value: player.stats.kdrAdjusted.any.toFixed(2) })),
		headshotPct: [...players]
			.filter(player => player.stats.kills.any.length > 0)
			.sort((a, b) => b.stats.headshotPct.any - a.stats.headshotPct.any)
			.map(player => ({ player, value: (player.stats.headshotPct.any * 100).toFixed() + "%" })),
		neckKillsPct: [...players]
			.map(player => ({
				player,
				value: player.stats.hitscanKills.any.filter(({ hitLoc }) => hitLoc === "neck").length /
					(player.stats.hitscanKills.any.length || 1)
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value)
			.map(({ player, value }) => ({ player, value: (value * 100).toFixed(1) + "%" })),
		explosiveKills: [...players]
			.filter(player => player.stats.explosiveKills.any.length > 0)
			.sort((a, b) => b.stats.explosiveKills.any.length - a.stats.explosiveKills.any.length)
			.map(player => ({ player, value: player.stats.explosiveKills.any.length })),
		revolverKills: [...players]
			.map(player => ({
				player,
				value: player.stats.kills.any.filter(({ weapon }) => weapon === "coltanaconda_mp").length
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		suicides: [...players]
			.filter(player => player.stats.suicides.any.length > 0)
			.sort((a, b) => b.stats.suicides.any.length - a.stats.suicides.any.length)
			.map(player => ({ player, value: player.stats.suicides.any.length })),
		attackHeliSuicides: [...players]
			.map(player => ({
				player,
				value: player.stats.kills.any.filter(({ weapon }) => weapon === "cobra_20mm_mp").length
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		noItemsWonRoundCount: [...players]
			.map(player => {
				const guid = player.guid;
				const value = player.rounds.traitor.filter(({ events, outcome }) => {
					const won = outcome.winner === "traitor";
					const bought = events.some(({ type, player }) => {
						return type === "item-buy" && player.guid === guid;
					});
					return won && !bought;
				}).length;
				return { player, value };
			})
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		radarsBoughtPct: [...players]
			.map(player => {
				const items = player.stats.items.traitor;
				const radarCount = items.find(({ name }) => name === "RADAR")?.count || 0;
				const totalCount = items.reduce((total, { count }) => total + count, 0);
				return { player, value: radarCount / (totalCount || 1) };
			})
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value)
			.map(({ player, value }) => ({ player, value: (value * 100).toFixed(1) + "%" })),
		chatMessages: [...players]
			.filter(player => player.stats.chatMessages.any.length > 0)
			.sort((a, b) => b.stats.chatMessages.any.length - a.stats.chatMessages.any.length)
			.map(player => ({ player, value: player.stats.chatMessages.any.length }))
	};
}

function getRoleTeam(role) {
	return role === "traitor" ? "traitor" : "innocent";
}

function getRoundTotals(rounds) {
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

function getRoundItems(rounds) {
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

function isPlayerInRounds(rounds, guid) {
	return rounds.findIndex(({ players }) => players.findIndex(p => p.guid === guid) > -1) > -1;
}

function getPlayerRounds(rounds, guid) {
	return rounds
		.filter(({ players }) => players.findIndex(p => p.guid === guid) > -1)
		.map(round => ({ ...round, player: round.players.find(p => p.guid === guid) }));
}

function getPlayerRoundsWon(playerRounds) {
	return playerRounds.filter(({ player, outcome }) => {
		return getRoleTeam(player.role) === outcome.winner;
	});
}

function getPlayerRoundsSurvived(playerRounds) {
	return playerRounds.filter(({ events, player }) => {
		const deaths = events.filter(({ type }) => type === "death");
		return deaths.findIndex(({ victim }) => victim.guid === player.guid) === -1;
	});
}

function getPlayerRoundsDiedFirst(playerRounds) {
	return playerRounds.filter(({ events, player }) => {
		const deaths = events.filter(({ type }) => type === "death");
		return deaths.findIndex(({ victim }) => victim.guid === player.guid) === 0;
	});
}

function getPlayerPlaytime(playerRounds) {
	return playerRounds.reduce((total, { outcome: { roundLength } }) => total + roundLength, 0);
}

function getPlayerKills(playerRounds) {
	const guid = playerRounds[0]?.player.guid;

	const events = playerRounds.flatMap(({ events }) => {
		return events.filter(({ type }) => type === "death");
	});

	return events.filter(({ victim, attacker }) => {
		return attacker && attacker.guid === guid && attacker.guid !== victim.guid;
	});
}

function getPlayerDeaths(playerRounds) {
	const guid = playerRounds[0]?.player.guid;

	const events = playerRounds.flatMap(({ events }) => {
		return events.filter(({ type }) => type === "death");
	});

	return events.filter(({ victim }) => {
		return victim.guid === guid;
	});
}

function getPlayerKDR(kills, deaths) {
	return kills.length / (deaths.length || 1);
}

function getPlayerAdjustedKDR(kills, deaths) {
	// friendly-fire kills count as deaths instead of kills
	const tk = getPlayerTeamKills(kills).length;
	const k = kills.length - tk;
	const d = deaths.length + tk;

	return k / (d || 1);
}

function getPlayerHitscanKills(kills) {
	return kills.filter(({ means }) => {
		return ["MOD_PISTOL_BULLET", "MOD_RIFLE_BULLET", "MOD_HEAD_SHOT"].includes(means);
	});
}

function getPlayerHeadshotPercentage(hitscanKills) {
	const headshotKills = hitscanKills.filter(({ means }) => means === "MOD_HEAD_SHOT");

	return headshotKills.length / (hitscanKills.length || 1);
}

function getPlayerTeamKills(kills) {
	return kills.filter(({ victim, attacker }) => {
		return victim && getRoleTeam(victim.role) === getRoleTeam(attacker.role);
	});
}

function getPlayerSuicides(deaths) {
	return deaths.filter(({ victim, attacker }) => {
		return !attacker || victim.guid === attacker.guid;
	});
}

function getPlayerExplosiveKills(kills) {
	return kills.filter(({ means }) => [
		"MOD_EXPLOSIVE", "MOD_GRENADE_SPLASH", "MOD_PROJECTILE_SPLASH", "MOD_PROJECTILE"
	].includes(means));
}

function getPlayerMultiKills(rounds) {
	const maxTimeDiff = 5;

	// TODO: dont have multiple multi kills in one array... nest it

	return rounds.map(round => {
		const multiKills = [];
		getPlayerKills([round]).forEach((kill, i, { [i - 1]: prevKill }) => {
			if (prevKill && kill.time - maxTimeDiff <= prevKill.time) {
				if (!multiKills.includes(prevKill)) multiKills.push(prevKill);
				multiKills.push(kill);
			}
		});
		return multiKills;
	}).filter(multiKills => multiKills.length > 0);
}

function getPlayerWeaponStats(kills) {
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

function getPlayerItems(rounds, guid) {
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

function getPlayerChatMessages(playerRounds) {
	const guid = playerRounds[0]?.player.guid;

	const events = playerRounds.flatMap(({ events }) => {
		return events.filter(({ type }) => type === "say");
	});

	return events.filter(e => {
		return e.player.guid === guid && e.messageType === "chat";
	});
}
