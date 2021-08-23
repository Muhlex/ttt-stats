function stripColors(str) {
	return str.replace(/\^[\d:;]/g, "");
}

export function findPlayerData(text) {
	const map = new Map();
	const players = [...text.matchAll(/J;(.*?);.*?;(.*)/g)];

	for (const [, guid, name] of players) {
		map.set(guid, {
			name: stripColors(name).trim(),
			isBot: guid.length !== 16
		});
	}
	return map;
}
