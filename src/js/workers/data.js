import { chunk } from "../util";
import { fetchData, pruneLog } from "../data";
import { parsePlayerMetadata } from "../data/players";
import { getRoundsRawText, parseRounds, filterInvalidRounds } from "../data/rounds";

self.onmessage = async ({ data: { url } }) => {
	self.postMessage({ status: "fetch" });
	const data = await fetchData(url);

	self.postMessage({ status: "parse", progress: 0 });
	const log = pruneLog(data);
	const playerMap = parsePlayerMetadata(log);
	const roundTextChunks = chunk(getRoundsRawText(log), 32);
	const rounds = roundTextChunks.reduce((r, chunk, i, { length }) => {
		self.postMessage({ status: "parse", progress: (i + 1) / (length || 1) });
		return r.concat(parseRounds(chunk, playerMap));
	}, []);
	const filteredRounds = filterInvalidRounds(rounds);

	self.postMessage({ status: "done", data: { rounds: filteredRounds, playerMap } });
};
