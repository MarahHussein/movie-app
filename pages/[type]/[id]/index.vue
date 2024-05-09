<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType)
  },
})

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')
const id = computed(() => route.params.id as string)

const [item] = await Promise.all([
  getMedia(type.value, id.value),
])
watchEffect(()=> {
	if(item ) {
		console.log(item)
	}
})

</script>

<template>
  <div >
    <MediaHero :item="item" />
    <MediaDetails :item="item" :type="type" />
  </div>
</template>
