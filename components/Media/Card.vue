<script setup lang="ts">
	const authStore = useAuthStore();

	const { refValue, open, close } = useToggle();
	const { item, type } = withDefaults(
		defineProps<{
			item: Media;
			type: MediaType;
		}>(),
		{
			item: () => ({} as Media),
			type: "movie",
		}
	);
	const typeOfItem = computed(() => {
		return type === "movie" ? "Movie" : "TV-series";
	});
	const year = computed(() => {
		return item.release_date?.substring(0, 4);
	});
	const title = computed(() => {
		return item.title || item.name;
	});
	const onRate = () => {
		if (authStore.loggedIn) {
			console.log("rate");
		} else {
			open();
		}
	};
	const onBookmark = () => {
		if (authStore.loggedIn) {
			console.log("bookmark");
		} else {
			open();
		}
	};
</script>
<template>
	<article
		class="mx-5 my-4 relative max-w-[280px] h-[608px] flex flex-col justify-between"
	>
		<NuxtLink :to="`/${item.media_type || type}/${item.id}`">
			<NuxtImg
				:src="`/tmdb${item.poster_path}`"
				:alt="item.title || item.name"
				width="280"
				height="420"
				format="webp"
				fit="contain"
				class="rounded-[10px]"
			/>
		</NuxtLink>
		<div>
			<div class="flex gap-2 items-center">
				<span>{{ year }}</span>
				<img src="/images/circle.png" alt="" />
				<span class="flex items-center gap-2">
					<img :src="`/images/icon-category-${type}.svg`" alt="" />
					{{ typeOfItem }}</span
				>
			</div>
			<h2 class="body-l mt-3">{{ title }}</h2>
			<AppRate :value="item.vote_average" />
			<button
				class="absolute top-4 right-4 w-10 h-10 bg-[#00000080] z-30 rounded-full flex items-center justify-center"
				@click="onBookmark"
			>
				<img
					:src="`/images/icon-bookmark-empty.svg`"
					alt="Bookmark"
					width="16"
				/>
			</button>
			<button
				class="w-full py-3 bg-myred rounded-[8px] hover:bg-white hover:text-primary"
				@click="onRate"
			>
				Rate this movie
			</button>
		</div>
	</article>
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
