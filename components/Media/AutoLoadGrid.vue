<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items: Media[]
    type: MediaType
    fetch: (page: number) => Promise<void>
    count?: number
    blocking?: boolean
  }>(),
  {
    blocking: true,
  },
)

const tailEl = ref<HTMLDivElement>()

let page = 0
const isLoading = ref(false)

async function loadingNext() {
  if (isLoading.value)
    return
  isLoading.value = true
  try {
    page += 1
    await props.fetch(page)
  }
  finally {
    isLoading.value = false
  }
}

if (process.server || props.blocking)
  await loadingNext()
else
  loadingNext()

if (process.client) {
  useIntervalFn(() => {
    if (!tailEl.value || isLoading.value)
      return
    if (props.count != null && props.items?.length >= props.count)
      return
    const { top } = tailEl.value.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < 400)
      loadingNext()
  }, 500)
}
</script>

<template>
  <section class="max-w-[1299px] mx-auto mt-5">
		<div class="flex items-center justify-between  py-3 px-10">
			<h1 class="heading-l capitalize">
      <slot />
    </h1>
    <div v-if="count != null" class="body-l">
      {{ count }}
    </div>
		</div>
    
		<div class="flex flex-wrap items-center justify-center gap-y-6">
			<MediaCard
        v-for="item of items"
        :key="item.id"
        :type="type"
        :item="item"
      />
		</div>
      
    <div ref="tailEl" />
    <div v-if="isLoading" >
      
    </div>
  </section>
</template>