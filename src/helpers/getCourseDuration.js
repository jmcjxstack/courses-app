export function getCourseDuration(n) {
	let hours = n / 60;
	let rhours = Math.floor(hours);
	let minutes = (hours - rhours) * 60;
	let rminutes = Math.round(minutes);
	if (rhours < 10) {
		return `0${rhours}:${rminutes} hour(s)`;
	} else {
		return `${rhours}:${rminutes} hour(s)`;
	}
}
