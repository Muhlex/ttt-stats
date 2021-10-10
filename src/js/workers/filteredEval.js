import { filterRounds, evalRounds } from "../eval";

self.onmessage = ({ data: { data, filters } }) => {
	const filteredRounds = filterRounds(data.rounds, filters);
	const players = [...data.playerMap.values()]
		.filter(({ isBot }) => !isBot)
		.sort((a, b) => a.name.localeCompare(b.name));
	self.postMessage(evalRounds(filteredRounds, players));
};
