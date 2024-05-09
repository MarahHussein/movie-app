<script setup lang="ts">

const props = defineProps<{
  medialist: Media[]
}>()

</script>

<template>
  <AppGrid>
    <MediaCard
        v-for="i of props.medialist || []"
        :key="i.id"
        :item="i"
        type="movie"
    />
  </AppGrid>
</template>