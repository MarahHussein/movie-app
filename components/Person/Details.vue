<script setup lang="ts">
defineProps<{
  item: Person
}>()

</script>

<template>
  <PersonInfo :item="item" />
		<AppGrid>
		<template #title> <h2 class="heading-l">Known for</h2> </template>
		<template
      v-for="i of item.combined_credits?.cast"
      :key="i.id"
    >
      <MediaCard
        v-if="i.release_date"
        :item="i"
        type="movie"
      />
    </template>
	</AppGrid>
</template>