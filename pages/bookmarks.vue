<script setup lang="ts">
const profileStore = useProfileStore();

const {data: items,refresh} = await useAsyncData('items',
    ()=>getMedias(profileStore.bookmarks))
setTimeout(refresh, 500);

</script>

<template>
  <AppCList
      v-if="items"
      :medialist="items"
  >
  </AppCList>
</template>