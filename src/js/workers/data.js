import { chunk } from "../util";
import { fetchData, fixLineEndings } from "../data";
import { parsePlayerMetadata } from "../data/players";
import { getRoundsRawText, parseRounds, filterInvalidRounds } from "../data/rounds";

self.onmessage = async ({ data: { url } }) => {
	self.postMessage({ status: "fetch", message: "Downloading Logfile" });
	const data = await fetchData(url);

	self.postMessage({ status: "parse", message: "Parsing Data", progress: "Preparing" });
	const log = fixLineEndings(data);
	const playerMap = parsePlayerMetadata(log);
	const roundsRawText = getRoundsRawText(log);
	const roundTextChunks = chunk(roundsRawText, Math.max(roundsRawText.length / 100, 8));
	const rounds = roundTextChunks.reduce((r, chunk, i, { length }) => {
		const progressFrac = (i + 1) / (length || 1);
		self.postMessage({ status: "parse", progress: (progressFrac * 100).toFixed() + "%" });
		return r.concat(parseRounds(chunk, playerMap));
	}, []);
	self.postMessage({ status: "parse", progress: "Cleaning up" });
	const filteredRounds = filterInvalidRounds(rounds);
	self.postMessage({ status: "done", data: { rounds: filteredRounds, playerMap } });
};

// handle errors thrown inside the async onmessage
self.addEventListener("unhandledrejection", event => {
	event.preventDefault();
	throw event.reason;
});
