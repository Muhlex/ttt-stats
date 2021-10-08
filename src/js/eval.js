import { groupBy, toMMSS } from "./util";

export const options = {
	leaderboards: {
		minRounds: 50,
		maxDaysSinceLastSeen: 90
	}
};

export function filterRounds(rounds, filters) {
	return rounds.filter(({ players, date }) => {
		return (
			(typeof filters.players.min !== "number" || players.length >= filters.players.min) &&
			(typeof filters.players.max !== "number" || players.length <= filters.players.max) &&
			(filters.date.min === null || isNaN(filters.date.min) || date >= filters.date.min) &&
			(filters.date.max === null || isNaN(filters.date.max) || date <= filters.date.max)
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
		leaderboards: evalLeaderboards(playerData.filter(player => {
			const lastRoundDate = rounds[rounds.length - 1]?.date;
			const lastSeenDate = player.rounds.any[player.rounds.any.length - 1]?.date;
			const daysSinceLastSeen = (lastRoundDate - (lastSeenDate || 0)) / (1000 * 60 * 60 * 24);
			const { leaderboards: { minRounds, maxDaysSinceLastSeen } } = options;
			return player.rounds.any.length >= minRounds || daysSinceLastSeen <= maxDaysSinceLastSeen;
		}))
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
		const roundsWon = getGroupedValue(getPlayerRoundsWon, [playedRoundsGrouped]);

		return {
			...p,
			rounds: playedRoundsGrouped,
			inRounds: isPlayerInRounds(playedRounds, p.guid),
			stats: {
				playtime: getGroupedValue(getPlayerPlaytime, [playedRoundsGrouped]),
				roundsWon,
				roundsSurvived: getGroupedValue(getPlayerRoundsSurvived, [playedRoundsGrouped]),
				roundsDiedFirst: getGroupedValue(getPlayerRoundsDiedFirst, [playedRoundsGrouped]),
				roundsFirstBlood: getGroupedValue(getPlayerRoundsFirstBlood, [playedRoundsGrouped]),
				kills,
				hitscanKills,
				teamKills: getGroupedValue(getPlayerTeamKills, [kills]),
				explosiveKills: getGroupedValue(getPlayerExplosiveKills, [kills]),
				environmentalKills: getGroupedValue(getPlayerEnvironmentalKills, [kills]),
				multiKills: getGroupedValue(getPlayerMultiKills, [playedRoundsGrouped]),
				aces: getGroupedValue(getPlayerAces, [roundsWon]),
				deaths,
				suicides: getGroupedValue(getPlayerSuicides, [deaths]),
				kdr: getGroupedValue(getPlayerKDR, [kills, deaths]),
				kdrAdjusted: getGroupedValue(getPlayerAdjustedKDR, [kills, deaths]),
				headshotPct: getGroupedValue(getPlayerHeadshotPercentage, [hitscanKills]),
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
			.map(player => ({ player, value: player.stats.kills.any.length }))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		deaths: [...players]
			.map(player => ({ player, value: player.stats.deaths.any.length }))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
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
		multiKills: [...players]
			.map(player => ({ player, value: player.stats.multiKills.any.length }))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		bombMultiKills: [...players]
			.map(player => ({
				player,
				value: player.stats.multiKills.any.filter(([k]) => k.weapon === "briefcase_bomb_mp").length
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		explosiveKills: [...players]
			.map(player => ({ player, value: player.stats.explosiveKills.any.length }))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		environmentalKills: [...players]
			.map(player => ({ player, value: player.stats.environmentalKills.any.length }))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		revolverKills: [...players]
			.map(player => ({
				player,
				value: player.stats.kills.any.filter(({ weapon }) => weapon === "coltanaconda_mp").length
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		rpgDirectHitKills: [...players]
			.map(player => ({
				player,
				value: player.stats.kills.any.filter(({ weapon, means }) => {
					return weapon === "rpg_mp" && means === "MOD_PROJECTILE";
				}).length
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		suicides: [...players]
			.map(player => ({ player, value: player.stats.suicides.any.length }))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		fallingSuicides: [...players]
			.map(player => ({
				player,
				value: player.stats.suicides.any.filter(({ means }) => {
					return ["MOD_FALLING", "MOD_TRIGGER_HURT"].includes(means);
				}).length
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		attackHeliSuicides: [...players]
			.map(player => ({
				player,
				value: player.stats.suicides.any.filter(({ weapon }) => weapon === "cobra_20mm_mp").length
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		traitorRoundWinTime: [...players]
			.map(player => ({
				player,
				value:
					player.stats.roundsWon.traitor.reduce((result, { outcome: { roundLength } }) => {
						return roundLength < result ? roundLength : result;
					}, Infinity)
			}))
			.filter(({ value }) => value < Infinity)
			.sort((a, b) => a.value - b.value)
			.map(({ player, value }) => ({ player, value: toMMSS(value) })),
		traitorRoundsLostTimelimitCount: [...players]
			.map(player => ({
				player,
				value: player.rounds.traitor.filter(round => round.outcome.reason === "timelimit").length
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		traitorNoItemsWonRoundCount: [...players]
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
		traitorRoundsFirstBlood: [...players]
			.map(player => ({
				player,
				value:
					player.stats.roundsFirstBlood.traitor.length / (player.rounds.traitor.length || 1)
			}))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value)
			.map(({ player, value }) => ({ player, value: (value * 100).toFixed(1) + "%" })),
		traitorRoundsAced: [...players]
			.map(player => ({ player, value: player.stats.aces.traitor.length }))
			.filter(({ value }) => value > 0)
			.sort((a, b) => b.value - a.value),
		radarsBoughtPct: [...players]
			.filter(player => player.stats.items.traitor.length > 0)
			.map(player => {
				const items = player.stats.items.traitor;
				const radarCount = items.find(({ name }) => name === "RADAR")?.count || 0;
				const totalCount = items.reduce((total, { count }) => total + count, 0);
				return { player, value: radarCount / (totalCount || 1) };
			})
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

function getPlayerRoundsFirstBlood(playerRounds) {
	return playerRounds.filter(({ events, player }) => {
		const deaths = events.filter(({ type }) => type === "death");
		return deaths[0]?.attacker?.guid === player.guid && deaths[0]?.victim.guid !== player.guid;
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

function getPlayerEnvironmentalKills(kills) {
	return kills.filter(({ weapon }) => ["barrel_mp", "destructible_car"].includes(weapon));
}

function getPlayerMultiKills(playerRounds) {
	const maxTimeDiff = 5;

	return playerRounds.flatMap(round => {
		const kills = getPlayerKills([round]);
		return kills.reduce((r, kill, i, { [i - 1]: prevKill, [i + 1]: nextKill }) => {
			const multiKill = r[r.length - 1];
			if (prevKill && kill.time - maxTimeDiff <= prevKill.time) {
				if (!multiKill.includes(prevKill)) multiKill.push(prevKill);
				multiKill.push(kill);
			} else if (nextKill && (!multiKill || multiKill.length > 0)) {
				r.push([]);
			}
			return r;
		}, []);
	}).filter(roundMultiKills => roundMultiKills.length > 0);
}

function getPlayerAces(playerRoundsWon) {
	return playerRoundsWon.filter(round => {
		const kills = getPlayerKills([round]);
		const enemies = round.players.filter(({ role }) => getRoleTeam(role) !== getRoleTeam(round.player.role));
		return kills.length === enemies.length;
	});
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
