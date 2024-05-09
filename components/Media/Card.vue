<script setup lang="ts">


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
	// const onRate = () => {
	// 	if (authStore.loggedIn) {
	// 		console.log("rate");
	// 	} else {
	// 		open();
	// 	}
	// };

</script>
<template>
	<article
		class="mx-5 my-4 relative max-w-[280px] h-[560px] flex flex-col justify-between"
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
<!--				<img src="/images/circle.png" alt="" />-->
<!--				<span class="flex items-center gap-2">-->
<!--					<img :src="`/images/icon-category-${type}.svg`" alt="" />-->
<!--					{{ (item.runtime) }}</span-->
<!--				>-->
			</div>
			<h2 class="body-l mt-3">{{ title }}</h2>
			<AppRate :value="item.vote_average" />

<!--			<button-->
<!--				class="w-full py-3 bg-myred rounded-[8px] hover:bg-white hover:text-primary"-->
<!--				@click="onRate"-->
<!--			>-->
<!--				Rate this movie-->
<!--			</button>-->
		</div>
	</article>

</template>
