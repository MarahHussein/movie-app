<script setup lang="ts">
const props = defineProps<{
  item: Person
}>()
</script>

<template>
<div class="p-4 grid grid-cols-1 tablet:grid-cols-[max-content_1fr] gap-8 items-center mx-auto  max-w-[1200px]">
  <NuxtImg
    v-if="props.item.profile_path"
    width="300"
    height="450"
    format="webp"
    :src="`/tmdb${props.item.profile_path}`"
    :alt="props.item.name"
    class="block border-4 border-gray-400/25 w-70 md:w-90 self-start mt-5 mx-auto transition duration-400 object-cover aspect-[3/4]"
  />
  <div class="p-4 gap-8">
    <div>
      <h2 class="text-3xl mb-4">
        {{ props.item.name }}
      </h2>

      <div v-if="props.item.biography" class="font-sans whitespace-pre-wrap opacity-80 leading-relaxed" v-text="props.item.biography"></div>
      <div v-else class="opacity-50 italic">
        no biography
      </div>
    </div>

    <div class="text-sm opacity-80">
      <ul class="grid grid-cols-[max-content_1fr] gap-3 items-center">
        <template v-if="props.item.known_for_department">
          <div class="opacity-60">
            Known for
          </div>
          <div>
            {{ props.item.known_for_department }}
          </div>
        </template>
        <template v-if="props.item.place_of_birth">
          <div class="opacity-60">
            Place of birth
          </div>
          <div>
            {{ props.item.place_of_birth }}
          </div>
        </template>

        <template v-if="props.item.birthday">
          <div class="opacity-60">
            Birthday
          </div>
          <div>
            {{ formatDate(props.item.birthday) }}
          </div>
        </template>
      </ul>
    </div>
  </div>
</div>

</template>
