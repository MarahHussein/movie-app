<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: number
  }>(),
  {
    value: 0,
  },
)

const style = computed(() => ({
  'clip-path': `inset(0 ${(10 - props.value) * 10}% 0 0)`,
}))
</script>

<template>
	<div class="flex  my-3 items-center gap-4">
		<div class="relative w-[85px] filter hue-rotate-320 mb-3">
    <img src="/images/stars.webp" class="absolute inset-0" aria-hidden="true">
    <img src="/images/stars-filled.webp" class="absolute inset-0" aria-hidden="true" :style="style">
</div>
<span>{{formatVote(props.value)}}</span>
	</div>


</template>