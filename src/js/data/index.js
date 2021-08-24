import {
	getDate,
	getPlayerCounts,
	getPlayers,
	getItems,
	getOutcome
} from "./rounds";
import { findPlayerData } from "./players";

export async function fetchData() {
	const res = await fetch(import.meta.env.VITE_LOG_ADDRESS);
	const text = await res.text();

	let log = text.replaceAll("\r", ""); // CRLF -> LF;
	// Remove rounds where server was idle:
	log = log.replace(
		/.* -{20,}\n.*InitGame\n.*TTT_ROUND_START.*\n.*TTT_ROUND_END.*(?:.|\n)*?.*ShutdownGame.*\n.*-{20,}\n/g,
		""
	);

	const players = findPlayerData(log);

	const rounds = log
		.match(/\d*:\d* InitGame(?:.|\n)*?ShutdownGame/g)
		.map(text => {
			return {
				date: getDate(text),
				playerCounts: getPlayerCounts(text),
				players: getPlayers(text, players),
				items: getItems(text),
				outcome: getOutcome(text)
			};
		})
		.filter(({ playerCounts, outcome }) => playerCounts && outcome)
		.filter(({ players }) => players.every(({ meta: { isBot } }) => !isBot));

	return { players, rounds };
}
