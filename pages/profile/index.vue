<script lang="ts" setup>
	const editing = ref(false);
	const profileStore = useProfileStore();
	const authStore = useAuthStore();
	const languagesOptions = [
		{ label: "Czech", value: "cs" },
		{ label: "Dutch", value: "nl" },
		{ label: "English", value: "en" },
		{ label: "Hindi", value: "hi" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
		{ label: "Japanese", value: "ja" },
		{ label: "Italian", value: "it" },
	];
	const genresOptions = [
		"Horror",
		"Thriller",
		"Comedy",
		"Action",
		"Talk",
		"Sci-Fi & Fantasy",
		"Mystery",
		"Soap",
		"Reality",
		"Documentary",
		"Crime",
		"Drama",
		"Action & Adventure",
		"Animation",
	];
	const languages = ref<string[]>([]);
	const genres = ref<string[]>([]);

	function onSubmit() {
		console.log([...languages.value]);
		profileStore.updateProfile([...genres.value]);
		editing.value = false;
	}
	function edit() {
		editing.value = true;
	}
	function updateGenres(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			genres.value.push(target.value);
		} else {
			genres.value = genres.value.filter((g) => g !== target.value);
		}
	}

	function updateLanguages(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			languages.value.push(target.value);
		} else {
			languages.value = languages.value.filter((l) => l !== target.value);
		}
	}

	function checkGenre(genreOption: string): boolean {
		return genres.value.includes(genreOption);
	}
	function checkLanguage(langOption: string): boolean {
		return languages.value.includes(langOption);
	}
	onMounted(()=>{
		if(authStore.authId) {
			genres.value = authStore.authUser?.genres||[];
			languages.value = authStore.authUser?.languages ||[];
		}
	})
  const appWrite = useAppWrite();
  function updateRecommenders (res: any){
    console.log('from subscribe response: ',res)
    useRecommenderStore().updateRecommender();
  }
  onMounted(()=> {
    appWrite.client.subscribe('functions.simple', async (data) => {
      await updateRecommenders(data);

    })
  })
</script>

<template>
	<div class="max-w-[1110px] mx-auto">
		<section v-show="!editing">
			<h1 class="heading-l mt-4 mb-10">Preferences</h1>

			<h2 class="heading-l text-white/50 mb-6">Your preferred genre:</h2>
			<ol class="flex flex-col items-start gap-4 m-4 ml-20">
				<li
					v-if="genres"
					v-for="genre in genres"
					class="heading-m capitalize flex gap-2 items-center"
				>
          <img src="/images/circle.png" alt="" class="size-2"/>{{ genre }}
				</li>
			</ol>
<!--			<h2 class="heading-m text-white/50">Your preferred languages:</h2>-->
<!--			<ul class="flex items-center gap-4 m-4">-->
<!--				<li-->
<!--					v-if="languages"-->
<!--					v-for="lang in languages"-->
<!--					class="body-m uppercase body-m"-->
<!--				>-->
<!--					{{ lang }}-->
<!--				</li>-->
<!--			</ul>-->
			<div class="flex justify-center">
				<button
					type="button"
					@click="edit"
					class="py-4 px-8 rounded-xl bg-[#a03333] text-white/75 text-xl hover:bg-white hover:text-primary font-semibold tracking-wide"
				>
					Edit preferences
				</button>
			</div>
		</section>

		<form v-show="editing" @submit.prevent="onSubmit">
			<fieldset class="preferences">
				<legend>Genre</legend>
				<div class="options">
					<div v-for="genreOption in genresOptions">
						<input
							type="checkbox"
							:id="genreOption"
							name="genre"
							:value="genreOption"
							:checked="checkGenre(genreOption)"
							@change="updateGenres"
						/>
						<label :for="genreOption">{{ genreOption }}</label>
					</div>
				</div>
			</fieldset>

<!--			<fieldset class="preferences">-->
<!--				<legend>Language</legend>-->
<!--				<div class="options">-->
<!--					<div v-for="langOption in languagesOptions" :key="langOption.value">-->
<!--						<input-->
<!--							type="checkbox"-->
<!--							:id="langOption.label"-->
<!--							name="language"-->
<!--							:value="langOption.value"-->
<!--							:checked="checkLanguage(langOption.value)"-->
<!--							@change="updateLanguages"-->
<!--						/>-->
<!--						<label :for="langOption.label">{{ langOption.label }}</label>-->
<!--					</div>-->
<!--				</div>-->
<!--			</fieldset>-->
			<div class="flex justify-center">
				<button
					type="submit"
					class="py-4 px-8 rounded-xl bg-[#a03333] text-white/75 text-xl hover:bg-white hover:text-primary font-semibold tracking-wide"
				>
					Save Preferences
				</button>
			</div>
		</form>
	</div>
</template>
