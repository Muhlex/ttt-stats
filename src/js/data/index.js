export async function fetchData(url) {
	const res = await fetch(url, { cache: "no-cache" });
	const text = await res.text();
	// let text = await import("../../dev.log?raw");
	// text = text.default;

	return text;
}

export function fixLineEndings(text) {
	return text.replaceAll("\r\n", "\n"); // CRLF -> LF;
}
