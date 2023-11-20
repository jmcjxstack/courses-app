export function formatCreationDate(inputDate) {
	const [day, month, year] = inputDate.split('/');

	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedMonth = month < 10 ? `0${month}` : month;

	const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

	return formattedDate;
}
