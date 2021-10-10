import { fetchData, parseData } from "../data";

self.onmessage = async ({ data: { url } }) => {
	self.postMessage({ status: "fetch" });
	const data = await fetchData(url);
	self.postMessage({ status: "parse" });
	const parsedData = await parseData(data);
	self.postMessage({ status: "done", data: parsedData });
};
