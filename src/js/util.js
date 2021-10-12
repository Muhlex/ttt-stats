export function groupBy(category, array) {
	return array.reduce((objectsByCategory, obj) => {
		const value = typeof category === "string" ? obj[category] : category(obj);
		objectsByCategory[value] = (objectsByCategory[value] || []).concat(obj);
		return objectsByCategory;
	}, {});
}

export function toMMSS(seconds) {
	return String(Math.floor(seconds / 60)).padStart(2, "0") + ":" +
		String(Math.floor(seconds % 60)).padStart(2, "0");
}

export function chunk(array, size) {
	const result = [];
	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}
	return result;
}
