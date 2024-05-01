<script setup lang="ts">

defineProps<{
  item: Media
  type: MediaType
}>()
</script>

<template>
  <MediaInfo :item="item" :type="type" />
  <AppCarsousel v-if="item.credits?.cast?.length">
    <template #title>
      film crew
    </template>
		<PersonCard
      v-for="i of item.credits?.cast"
      :key="i.id"
      :item="i"
      class="flex-1"
    />
  </AppCarsousel>
</template>
