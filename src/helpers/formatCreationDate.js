export function formatCreationDate(s) {
	const formattedString = `${s.slice(0, 2)}.${s.slice(3, 5)}.${s.slice(8, 10)}`;
	return formattedString;
}

// export function formatCreationDate(inputDate) {
// 	const regex = /^(\d{1,2})[\/\.](\d{1,2})[\/\.](\d{4})$/;
// 	const match = inputDate.match(regex);

// 	if (match) {
// 		const day = match[1].padStart(2, '0');
// 		const month = match[2].padStart(2, '0');
// 		const year = match[3];

// 		const formattedDate = `${day}.${month}.${year}`;

// 		return formattedDate;
// 	}

// 	return 'Invalid date format';
// }

// const a = '9/3/2021';
// const b = '09/03/2021';

// console.log(formatCreationDate(a));
// console.log(formatCreationDate(b));
