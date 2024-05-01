<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			item: Media;
		}>(),
		{
			item: () => ({} as Media),
		}
	);
const trailer = computed(() => getTrailer(props.item))

	const {refValue, open, close, toggle} = useToggle()

	const mounted = useMounted();
</script>

<template>
	<div :key="item.id" class="relative ">
		<div class="relative top-0 right-0 mobile:left-0 desktop:right-[-150px]">
			<NuxtImg 
				width="1125"
				height="500"
				format="webp"
				:src="`/tmdb${props.item.backdrop_path}`"
				:alt="props.item.title || props.item.name"
				fit="cover"
				class="w-full h-full max-h-[600px]"
			/>
		</div>
		<div
			class="absolute bottom-0 left-0 top-0 px-10 flex flex-col justify-center tablet:right-0 desktop:px-20 desktop:w-2/3 desktop:bg-gradient-to-r from-black via-black to-transparent notDesktop:w-full notDesktop:bg-[#00000025]"
		>
			<Transition appear name="hero">
				<div v-show="mounted">
					<h1 class="mt- text-4xl desktop:text-5xl">
						{{ props.item.title || props.item.name }}
					</h1>
					<div class="flex flex-wrap gap-2 items-center mt-4">
						<AppRate :value="props.item.vote_average" />
						<span class="opacity-50">·</span>
						<div v-if="props.item.release_date" class="opacity-50">
							{{ props.item.release_date.slice(0, 4) }}
						</div>
						<span v-if="props.item.runtime" class="opacity-50">·</span>
						<div v-if="props.item.runtime" class="opacity-50">
							{{ formatTime(props.item.runtime) }}
						</div>
					</div>
					<p class="notDesktop:text-sm mt-2 opacity-80 text-lg mobile:hidden">
						{{ props.item.overview }}
					</p>
					<div v-if="trailer" class="py5 display-none lg:block">
						<button
							class="flex gap-2 items-center px-3 py-2 bg-[#FFFFFF15] hover:bg-[#FFFFFF20] mt-4"
							@click="open()"
						>
							<fai icon="play" class="size-5"></fai>
							<span>Watch Trailer</span>
						</button>
					</div>
				</div>
			</Transition>
		</div>
	</div>
	<BaseFrame v-if="trailer && refValue" :src="trailer" @close="close">
	</BaseFrame>
</template>

<style>
	.hero-enter-active,
	.hero-leave-active {
		transition: transform 0.75s cubic-bezier(0.4, 0.25, 0.3, 1),
			opacity 0.3s cubic-bezier(0.4, 0.25, 0.3, 1);
	}

	.hero-enter-from,
	.hero-leave-to {
		opacity: 0;
		transform: translate3d(0, 2rem, 0);
	}

	.hero-enter-to,
	.hero-leave-from {
		opacity: 1;
		transform: translateZ(0);
	}
</style>
