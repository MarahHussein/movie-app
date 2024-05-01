import {
	Client,
	Account,
	Databases,
	Functions,
	Storage,
	Locale,
	Avatars,
} from "appwrite";

export function useAppWrite() {
	const client = new Client()
		.setEndpoint("https://cloud.appwrite.io/v1")
		.setProject("662f926a0038b392019b");

	const account = new Account(client);
	const databases = new Databases(client);
	const storage = new Storage(client);
	const locale = new Locale(client);
	const avatars = new Avatars(client);
	return {
		client,
		storage,
		account,
		databases,
		locale,
		avatars,
	};
}
