import { ID } from "appwrite";

export const useAuthStore = defineStore("auth", () => {
	const appWrite = useAppWrite();
	const loginErr = ref(false);
	const registerErr = ref("");
	const loggedIn = useLocalStorage("loggedIn", false);
	const authId = ref("");

	const authAccount = ref<Account | null>(null);
	const authUser = ref<User | null>(null);

	function login(data: { email: string; password: string }) {
		const router = useRouter();
		loginErr.value = false;
		const loginOperation = appWrite.account.createEmailSession(
			data.email,
			data.password
		);
		loginOperation.then(
			(res) => {
				loggedIn.value = true;
				getAuthUser();
				router.push("/");
			},
			(err) => {
				loginErr.value = true;
				console.log("🍍🔑❌ login:", err);
			}
		);
	}

	function logout() {
		const router = useRouter();
		const logoutOperation = appWrite.account.deleteSession("current");
		logoutOperation.then(
			() => {
				loggedIn.value = false;
				router.push("/");
				console.log("🍍🔑✔️ logout");
			},
			(err) => {
				console.log("🍍🔑✖️ logout", err);
			}
		);
	}

	async function createNewUser(data: {
		email: string;
		password: string;
		name: string;
	}) {
		try {
			const router = useRouter();
			registerErr.value = "";
			const createAccount = await appWrite.account.create(
				ID.unique(),
				data.email,
				data.password,
				data.name
			);
			const user = {
				name: data.name,
				email: data.email,
			};
			await appWrite.databases.createDocument(
				"appData",
				"users",
				createAccount.$id,
				{ ...user }
			);
			router.push("/login");
		} catch (error) {
			registerErr.value = `${error}`;
			console.log("🍍👤❌ create new user", error);
		}
	}

	async function getAuthUser() {
		try {
			const getAccount = await appWrite.account.get();
			authId.value = getAccount.$id;
			authAccount.value = useTransform<Account>(getAccount, accountKeys);
			const getUser = await appWrite.databases.getDocument(
				"appData",
				"users",
				authId.value
			);
			authUser.value = useTransform<User>(getUser, userKeys);
		} catch (error) {
			loggedIn.value = false;
			console.log("🍍👤❌ get user and account", error);
		}
	}

	async function deleteAccount() {
		await appWrite.account.deleteIdentity(authId.value);
		await appWrite.databases.deleteDocument("appData", "users", authId.value);
		logout();
	}

	async function checkIfStillLoggedIn() {
		try {
			await appWrite.account.get();
			loggedIn.value = true;
			getAuthUser();
		} catch (error) {
			loggedIn.value = false;
		}
	}

	return {
		loggedIn,
		authId,

		loginErr,
		registerErr,

		login,
		logout,
		createNewUser,
		deleteAccount,

		authAccount,
		authUser,
		getAuthUser,
		
		checkIfStillLoggedIn,
	};
});
