<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			item: Media;
			type: MediaType;
		}>(),
		{
			item: () => ({} as Media),
			type: "movie",
		}
	);
  const authStore = useAuthStore();
  const profileStore = useProfileStore()
  const bookmarked = computed(()=> {
    return profileStore.bookmarks?.includes(`${props.item.id}`) ? 'full' :'empty';
  })
  const { refValue, open, close } = useToggle();

	const directors = computed(() =>
		props.item.credits?.crew.filter((person) => person.job === "Director")
	);
  const onBookmark = () => {
    if (authStore.loggedIn) {
      const id = `${props.item.id}`
      console.log(id);

      profileStore.bookmarkMovie(id);
    } else {
      open();
    }
  };
</script>

<template>
	<div
		class="p-4 grid grid-cols-[max-content_1fr] gap-8 items-center mx-auto w-full max-w-[75rem] my-10 relative"
	>
    <button
        class="absolute top-4 right-4 w-10 h-10 bg-[#00000080] z-30 rounded-full flex items-center justify-center"
        @click="onBookmark"
    >
      <img
          :src="`/images/icon-bookmark-${bookmarked}.svg`"
          alt="Bookmark"
          width="16"
      />
    </button>
		<NuxtImg
			width="300"
			height="450"
			format="webp"
			:src="`/tmdb${props.item.poster_path}`"
			:alt="props.item.title || props.item.name"
			class="border-8 border-gray-400/35 hidden tablet:block transition duration-400 object-cover"
			:style="{ 'view-transition-name': `item-${props.item.id}` }"
		/>
		<div class="flex flex-col md:p-4 gap-6">
			<div v-if="props.item.overview">
				<h2 class="text-4xl mb-4">Storyline</h2>
				<div class="opacity-80 text-lg" v-text="props.item.overview"></div>
			</div>

			<div class="text-sm opacity-80">
				<ul
					class="grid grid-cols-[max-content_1fr] desktop:grid-cols-[max-content_1fr_max-content_1fr] gap-3 items-center text-base"
				>
					<template v-if="props.item.release_date">
						<div>Release Date</div>
						<div>
							{{ formatDate(props.item.release_date) }}
						</div>
					</template>
					<template v-if="props.item.runtime">
						<div>Runtime</div>
						<div>
							{{ formatTime(props.item.runtime) }}
						</div>
					</template>
					<template v-if="directors?.length">
						<div>Director</div>
						<div class="flex flex-row flex-wrap gap-1">
							<NuxtLink
								v-for="person in directors"
								:key="person.id"
								:to="`/person/${person.id}`"
								class="bg-gray-100/20 hover:bg-gray-200/25 px-2 py-1 rounded text-xs"
							>
								{{ person.name }}
							</NuxtLink>
						</div>
					</template>
					<template v-if="props.item.budget">
						<div>Budget</div>
						<div>${{ numberWithCommas(props.item.budget) }}</div>
					</template>
					<template v-if="props.item.revenue">
						<div>Revenue</div>
						<div>${{ numberWithCommas(props.item.revenue) }}</div>
					</template>
					<template v-if="props.item?.genres?.length">
						<div>Genre</div>
						<div class="flex flex-row flex-wrap gap-1">
							<NuxtLink
								v-for="genre in props.item.genres"
								:key="genre.id"
								:to="`/genre/${genre.id}/${type}`"
								class="bg-gray-100/20 hover:bg-gray-200/25 px-2 py-1 rounded text-xs"
							>
								{{ genre.name }}
							</NuxtLink>
						</div>
					</template>
					<template v-if="props.item.status">
						<div>Status</div>
						<div>
							{{ props.item.status }}
						</div>
					</template>
					<template v-if="props.item.original_language">
						<div>Language</div>
						<div class="uppercase">{{props.item.original_language}}</div>
					</template>
					<template v-if="props.item?.production_companies?.length">
						<div>Production</div>
						<div>
							{{
								props.item.production_companies.map((i) => i.name).join(", ")
							}}
						</div>
					</template>
				</ul>
			</div>
		</div>
	</div>
  <LazyBasePopUp v-if="refValue" @close="close">
    <p class="text-xl mb-4 text-white/85">Please Login so you can rate and bookmark your favorite movies!</p>
    <div class="flex items-center justify-center gap-4">
      <NuxtLink
          to="/login"
          class="px-8 py-2 bg-myred rounded-[8px] hover:bg-white hover:text-primary text-lg"
      >Login</NuxtLink
      >
      <NuxtLink
          to="/login"
          class="px-8 py-2 bg-white/90 rounded-[8px] hover:bg-white/25 text-primary text-lg"
      >Sign up</NuxtLink
      >
    </div>
  </LazyBasePopUp>
</template>
