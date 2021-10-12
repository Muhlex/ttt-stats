export async function fetchData(url) {
	const res = await fetch(url);
	const text = await res.text();
	// let text = await import("../../dev.log?raw");
	// text = text.default;

	return text;
}

export function pruneLog(text) {
	let log = text.replaceAll("\r\n", "\n"); // CRLF -> LF;
	// Remove rounds where server was idle:
	log = log.replace(
		/.* -{20,}\n.*InitGame\n.*TTT_ROUND_START.*\n.*TTT_ROUND_END.*(?:.|\n)*?.*ShutdownGame.*\n.*-{20,}\n/g,
		""
	);
	return log;
}
