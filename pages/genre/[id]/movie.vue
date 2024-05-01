<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id as string)
const type = 'movie' as MediaType

const items: Media[] = reactive([])

const list = await getGenreList(type)
const name = list.find((item: any) => item.id === +id.value)?.name
async function fetch(page: number) {
  const data = await getMediaByGenre(type, id.value, page)
  items.push(...data.results)
}
</script>

<template>
  <MediaAutoLoadGrid
    :fetch="fetch"
    :type="type"
    :items="items"
  >
    {{ type === 'tv' ? 'TV' : 'Movie' }} Genre: {{ name }}
  </MediaAutoLoadGrid>
</template>
