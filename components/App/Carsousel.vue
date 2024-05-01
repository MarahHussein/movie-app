<script setup lang="ts">
	const scrollEl = ref<HTMLDivElement>();

	function scrollLeft() {
		scrollEl.value?.scrollBy({
			left: -window.innerWidth,
			behavior: "smooth",
		});
	}

	function scrollRight() {
		scrollEl.value?.scrollBy({
			left: window.innerWidth,
			behavior: "smooth",
		});
	}
</script>

<template>
	<div class="mx-5 desktop:mx-10">
		<div class="text-3xl capitalize mb-4">
			<slot name="title" />
		</div>
	<div class="relative mb-5">
		<div ref="scrollEl" class="overflow-y-auto scroll-container">
			<div class="flex gap-4 w-max">
				<slot />
			</div>
		</div>
		<button
			class="flex flex-col absolute top-0 left-0 bottom-0 bg-black bg-opacity-50 px-6 items-center justify-center opacity-0 hover:opacity-100 transition"
			title="Scroll left"
			@click="scrollLeft()"
		>
			<fai icon="angle-left" class="size-10"/>
		</button>
		<button
			class="flex flex-col absolute top-0 right-0 bottom-0 bg-black bg-opacity-50 p-3 items-center justify-center opacity-0 hover:opacity-100 transition"
			title="Scroll right"
			@click="scrollRight()"
		>
			<fai icon="angle-right" class="size-10"/>
		</button>
	</div>
	</div>
		
</template>

<style>
/* Styles the scrollbar track */
.scroll-container::-webkit-scrollbar {
  width: 14px; 
  height: 14px; 
}

/* Styles the scrollbar handle */
.scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(169, 169, 169, 0.514);
  border-radius: 10px;
  /* border: 2px solid orange;  */
	
}

/* Optional: style the scrollbar track (part that the handle slides within) */
.scroll-container::-webkit-scrollbar-track {
  background: #161D2F;
  border-radius: 10px;
}

/* Optional: style the scrollbar buttons (arrows at the end of the scrollbar) */
.scroll-container::-webkit-scrollbar-button {
  display: none; /* often not needed, but you can style if visible */
}

</style>
