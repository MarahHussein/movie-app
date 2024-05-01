export function formatDate(string: string) {
	const date = new Date(string);
	return date.getFullYear();
}
