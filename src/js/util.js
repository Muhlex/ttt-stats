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
	const sizeInt = parseInt(size);
	if (sizeInt === 0) throw new Error("Cannot chunk into chunks of 0 length.");

	const result = [];
	for (let i = 0; i < array.length; i += sizeInt) {
		result.push(array.slice(i, i + sizeInt));
	}
	return result;
}
