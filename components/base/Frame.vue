<script lang="ts" setup>
	import { vOnClickOutside } from "@vueuse/components";
	const { height, width } = useWindowSize();
	const h = computed(() => {
		const hm = width.value > 768 ? height.value - 160 : height.value - 40;
		return `${hm}px`;
	});
	const w = computed(() => {
		const wm = width.value > 768 ? width.value - 160 : width.value - 40;
		return `${wm}px`;
	});

	const emit = defineEmits(["close"]);
	function close() {
		emit("close");
	}
	const props = defineProps<{
		src: string;
	}>();
</script>
<template>
	<section
		class="fixed top-0 left-0 right-0 bottom-0 z-30 bg-[#00000080] flex overflow-auto"
	>
		<div class="relative size-full">
			<button
				class="absolute top-3 right-3 z-50 p-1 border-none rounded-[8px] bg-[#FFFFFF20]"
				@click="close"
			>
				<fai icon="xmark" class="size-8 relative text-white" />
			</button>
			<div class="m-5 tablet:m-20">
				<div v-on-click-outside="close" class="size-full">
					<iframe
						ref="el"
						allow="autoplay; encrypted-media"
						allowfullscreen
						:src="props.src"
						class="max-h-full max-w-full frame"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
<style>
	.frame {
		width: v-bind(w);
		height: v-bind(h);
	}
</style>
