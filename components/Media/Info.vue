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

	const directors = computed(() =>
		props.item.credits?.crew.filter((person) => person.job === "Director")
	);
</script>

<template>
	<div
		class="p-4 grid grid-cols-[max-content_1fr] gap-8 items-center mx-auto w-full max-w-[75rem] my-10"
	>
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
</template>
