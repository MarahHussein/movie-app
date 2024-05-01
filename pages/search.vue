<script setup lang="ts">
definePageMeta({
  pageTransition: false,
})

const route = useRoute()
const router = useRouter()
const input = ref((route.query.s || '').toString())
const error = ref<unknown>()
const count = ref<undefined | number>()

const items = ref<Media[]>([])
const currentSearch = ref(input.value)

function search() {
  if (currentSearch.value === input.value)
    return

  currentSearch.value = input.value.toString()
  count.value = undefined
  items.value = []
  router.replace({ query: { s: input.value } })
}

async function fetch(page: number) {
  if (!currentSearch.value)
    return
  try {
    const data = await searchShows(currentSearch.value, page)
    count.value = data.total_results ?? count.value
    items.value.push(...data.results)
  }
  catch (e: any) {
    error.value = e
  }
}

const throttledSearch = useDebounceFn(search, 200)

watch(
  () => input.value,
  () => throttledSearch(),
)
</script>

<template>
  <div>
    <div class="flex bg-slate-400/25 items-center px-24 py-16 gap-3 sticky top-0">
      <div class="i-ph:magnifying-glass text-2xl opacity-50" />
      <input
        v-model="input"
        type="text"
        class="text-2xl bg-transparent outline-none w-full"
        placeholder="Type to search..."
        @keyup.enter="search"
      >
    </div>
    <div v-if="error" class="p-32 flex flex-col gap-3 items-start">
      <h1 class="text-4xl text-red-500">
        Error occurred on fetching
      </h1>
      <pre class="py-8">{{ error }}</pre>
      <button class="border px-16 py-4 rounded" @click="error = undefined">
        Retr
      </button>
    </div>
    <MediaAutoLoadGrid
      v-else-if="currentSearch"
      :key="currentSearch"
      :fetch="fetch"
      :items="items"
      :count="count"
      :blocking="false"
      type="movie"
    >
      <div>Search result for: {{ currentSearch }}</div>
    </MediaAutoLoadGrid>
    <div v-else class="text-4xl p-40 font-thin opacity-50 text-center">
      Type something to search...
    </div>
  </div>
</template>

