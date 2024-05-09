<script setup lang="ts">
const profileStore = useProfileStore();

const items = await getMedias(profileStore.bookmarks)
</script>

<template>
  <AppCList
      v-if="items"
      :medialist="items"
  >
  </AppCList>
</template>