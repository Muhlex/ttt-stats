function stripColors(str) {
	return str.replace(/\^[\d:;]/g, "");
}

export function getPlayerMetadata(text) {
	const map = new Map();
	const players = [...text.matchAll(/\n *\d*:\d* J;(.*?);.*?;(.*)/g)];

	for (const [, guid, name] of players) {
		map.set(guid, {
			guid,
			name: stripColors(name).trim(),
			isBot: guid.length !== 16
		});
	}
	return map;
}
