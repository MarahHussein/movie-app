<script setup lang="ts">

defineProps<{
  item: Person
}>()
</script>

<template>
<NuxtLink :to="`/person/${item.id}`">
  <div
    class="block bg-gray-400/20 p-2 aspect-[10/16] transition duration-400 hover:scale-[1.025] hover:z-10 cursor-pointer"
  >
    <NuxtImg
      v-if="item.profile_path"
      width="250"
      height="400"
      format="webp"
      :src="`/tmdb${item.profile_path}`"
      :alt="item.name"
      class="w-full h-full object-cover"
    />
    <div v-else class="h-full opacity-10 flex items-center justify-center">
			<fai icon="user" class="size-20 "/>
    </div>
  </div>
  <div class="mt-2">
    {{ item.name }}
  </div>
  <div class="opacity-50">
    {{ item.character || item.known_for_department }}
  </div>
</NuxtLink>
</template>
