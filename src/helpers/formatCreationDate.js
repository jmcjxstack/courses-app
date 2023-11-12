export function formatCreationDate(s) {
	const formattedString = `${s.slice(0, 2)}.${s.slice(3, 5)}.${s.slice(8, 10)}`;
	return formattedString;
}
