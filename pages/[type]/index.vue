<script setup lang="ts">

definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType)
  },
})

const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')
const queries = computed(() => QUERY_LIST[type.value as MediaType])


</script>

<template>
  <div>
    <AppList
      v-for="query of queries"
      :key="query.type + query.query"
      :query="query"
    />
  </div>
</template>
