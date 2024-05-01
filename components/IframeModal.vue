<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'

const src = ref<string | null>(null)

function showModal(link: string) {
  src.value = link
}
const el = ref<HTMLIFrameElement>()

provideIframeModal(showModal)

onKeyDown('Escape', () => {
  if (src.value)
    src.value = null
})

onClickOutside(el, () => {
  src.value = null
})
</script>

<template>
  <div v-if="src" class="fixed top-0 left-0 right-0 bottom-0 z-10 bg-[#00000090] flex" >
    <button
			class="absolute top-1 right-1 z-50 p-3 border-none rounded-full"
      title="Close"
      @click="src = null"
    >
			<fai icon="xmark" class="text-xl text-[#FFFFFF50]"/>
    </button>
    <iframe
      ref="el"
      allow="autoplay; encrypted-media"
      allowfullscreen
      :src="src"
			class="w-full m-5 tablet:m-20 border-none"
			
    />
  </div>
</template>
