

export const useProfileStore = defineStore("profile", () => {
	const appWrite = useAppWrite();
	const authStore = useAuthStore();
	const bookmarksMovies = ref<Media[]>([])
	const bookmarks = computed((): string[]=> authStore.authUser?.bookmarks || []);
	async function updateProfile( genres: string[]) {
		try {
			if (authStore.authUser?.$id) {
				await appWrite.databases.updateDocument(
					"appData",
					"users",
					authStore.authUser.$id,
					{
						genres: genres,
					}
				);
				// appWrite.updateSimpleRecommender(genres);
				console.log("preferences updated:", genres);
			}
		} catch (error) {
			console.log("Failed to update languages", "e", `${error}`);
		}
	}
	function bookmarkMovie(id: string){

		const bookmarksArray :string[] = [...bookmarks.value]
		const index  : number = bookmarksArray.indexOf(id);
		const userId = authStore.authUser?.$id;

		if (userId) {
			const index = bookmarksArray.indexOf(id);
			if (index > -1) {
				// ID is found, remove it
				console.log('ID exists, removing from bookmarks');
				bookmarksArray.splice(index, 1);
			} else {
				// ID not found, add it
				console.log('ID does not exist, adding to bookmarks');
				bookmarksArray.push(id);
			}

			// Update the bookmarks in the database
			appWrite.databases.updateDocument("appData", "users", userId, {
				bookmarks: bookmarksArray
			}).then(res => {
				authStore.getAuthUser(); // Refresh auth user data
				console.log('Update completed and user refreshed');
			});
		}
	}
	// async function loadBookmarkedMovies() {
	// 		try {
	// 			const bookmarksMovies = await getMedias(bookmarks.value);
	// 			console.log('pushed to the array');
	// 		} catch (error) {
	// 			console.error('Failed to fetch media for ID:', error);
	// 		}
	//
	// }

	return {bookmarks, bookmarksMovies,updateProfile, bookmarkMovie };
});
