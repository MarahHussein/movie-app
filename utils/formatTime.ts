export function formatTime(minutes: number) {
	// seconds
	const seconds = minutes * 60;
	let secondsLeft = seconds;

	// hours
	const hours = Math.floor(secondsLeft / 3600);
	secondsLeft = secondsLeft % 3600;

	// mins
	const mins = Math.floor(secondsLeft / 60);
	secondsLeft = secondsLeft % 60;

	return `${hours ? `${hours}h` : ""} ${mins}min`;
}
