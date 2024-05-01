<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
const {height} = useWindowSize()
const h = computed(()=> `${height.value}px`)
const emit = defineEmits(['close'])
function close() {
	emit('close')
} 
</script>
<template>
		<section class="fixed top-0 left-0 right-0 bottom-0 zidx bg-[#00000099] overflow-auto flex items-center justify-center">
	
		<div class="max-w-[992px] w-fit bg-slate-700 p-4 tablet:p-8 rounded-[8px] mx-auto" v-on-click-outside="close">
			<div class="flex items-center justify-end">
				<button class="bg-slate-50/25 p-1 rounded-md mb-4" @click="close">
					<fai icon="xmark" class="size-5 "/>
				</button>
			</div>
			<slot></slot>
		</div>
	</section>	
</template>

<style>
.zidx{
	z-index: 100;
}
</style> 