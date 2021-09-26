import {
	getDate,
	getPlayers,
	getOutcome,
	getEvents
} from "./rounds";
import { getPlayerMetadata } from "./players";

export async function fetchData() {
	const res = await fetch(import.meta.env.VITE_LOG_ADDRESS);
	const text = await res.text();
	// let text = await import("../../dev.log?raw");
	// text = text.default;

	return text;
}

export function parseData(text) {
	return new Promise(resolve => {
		let log = text.replaceAll("\r", ""); // CRLF -> LF;
		// Remove rounds where server was idle:
		log = log.replace(
			/.* -{20,}\n.*InitGame\n.*TTT_ROUND_START.*\n.*TTT_ROUND_END.*(?:.|\n)*?.*ShutdownGame.*\n.*-{20,}\n/g,
			""
		);

		const players = getPlayerMetadata(log);

		const rounds = log
			.match(/\d*:\d* InitGame(?:.|\n)*?ShutdownGame/g)
			.map(text => {
				const roundPlayers = getPlayers(text, players);
				return {
					date: getDate(text),
					players: roundPlayers,
					outcome: getOutcome(text),
					events: getEvents(text, roundPlayers, players)
				};
			})
			.filter(({ players, outcome }) => players.length && outcome)
			.filter(({ players }) => players.every(({ isBot }) => !isBot));

		resolve({ players, rounds });
	});
}
