<script lang="ts" setup>
	const editing = ref(false);
	const profileStore = useProfileStore();
	const authStore = useAuthStore();
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
	const genres = ref<string[]>([]);

	function onSubmit() {
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

	function checkGenre(genreOption: string): boolean {
		return genres.value.includes(genreOption);
	}

	onMounted(()=>{
		if(authStore.authId) {
			genres.value = authStore.authUser?.genres||[];
		}
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
