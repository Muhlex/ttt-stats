function logTimeToSeconds(timeString) {
	const [min, sec] = timeString.split(":");
	return (Number(min) * 60) + Number(sec);
}

export function getDate(text) {
	const result = text.match(/\n *\d*:\d* TTT_ROUND_START;(\d+)/);
	if (!result) return null;

	else return new Date(Number(result[1]) * 1000);
}

export function getPlayers(text, playerMap) {
	const result = text.match(/\n *\d*:\d* TTT_PLAYERS;(.*)\n/);
	if (!result) return [];

	return result[1].split(";").map(data => {
		const [, guid, role] = data.match(/(.*)<(.*)>/);
		return { ...playerMap.get(guid), role };
	});
}

export function getOutcome(text) {
	const result = text.match(/\n *\d*:\d* TTT_ROUND_END;(.*?);(.*?);(.*);*/);
	if (!result) return null;

	const [, winner, reason, roundLength] = result;
	return { winner, reason, roundLength: Number(roundLength) };
}

function getDamageEvent(text, players) {
	const result = text.match(/ *(\d*:\d*) (D|K);(.*);.*;.*;.*;(.*);.*;.*;.*;(.*);(.*);(.*);(.*)/);
	if (!result) return null;

	const [, timeRaw, type, victimGuid, attackerGuid, weaponRaw, damage, means, hitLoc] = result;

	const time = logTimeToSeconds(timeRaw);
	const victim = players.find(({ guid }) => guid === victimGuid);
	const attacker = players.find(({ guid }) => guid === attackerGuid);
	let weapon = weaponRaw;
	if (means === "MOD_MELEE" && !["combat_knife_mp", "riotshield_mp"].includes(weapon)) {
		weapon = "melee_mp";
	}

	const events = [{
		type: "damage", time, victim, attacker, damage: Number(damage), weapon, means, hitLoc
	}];

	if (type === "K") {
		events.push({
			type: "death", time, victim, attacker, damage: Number(damage), weapon, means, hitLoc
		});
	}

	return events;
}

function getItemBuyEvent(text, players) {
	const result = text.match(/ *(\d*:\d*) TTT_ITEM_BOUGHT;(.*);.*;.*;(.*)/);
	if (!result) return null;

	const [, timeRaw, guid, item] = result;
	const player = players.find(player => player.guid === guid);
	return { type: "item-buy", time: logTimeToSeconds(timeRaw), player, item };
}

function getChatEvent(text, players, playerMap) {
	const result = text.match(/ *(\d*:\d*) say;(.*?);.*?;.*?;(.*)/);
	if (!result) return null;

	const [, timeRaw, guid, messageRaw] = result;
	const player = players.find(player => player.guid === guid) || playerMap.get(guid) || { guid };
	const messageType = messageRaw[0] === "\u0014" ? "quickmessage" : "chat";
	const message = ["\u0014", "\u0015"].includes(messageRaw[0]) ? messageRaw.slice(1) : messageRaw;
	return { type: "say", time: logTimeToSeconds(timeRaw), player, message, messageType };
}

export function getEvents(text, players, playerMap) {
	const result = text.match(/\n *(\d*:\d*) TTT_ROUND_START.*\n((?:.|\n)*?)\n *(\d*:\d*) TTT_ROUND_END/);
	if (!result) return null;

	const [, startTimeRaw, eventsText, endTimeRaw] = result;
	const startTime = logTimeToSeconds(startTimeRaw);
	const endTime = logTimeToSeconds(endTimeRaw);

	const events = eventsText.split("\n").map(eventText => {
		return getDamageEvent(eventText, players) ||
			getItemBuyEvent(eventText, players) ||
			getChatEvent(eventText, players, playerMap) ||
			null;
	}).filter(event => event).flat(1);

	return [
		{ type: "round-start", time: startTime },
		...events,
		{ type: "round-end", time: endTime }
	].map(event => ({ ...event, time: event.time - startTime }));
}
