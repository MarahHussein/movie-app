<script setup lang="ts">
const recommender = useRecommenderStore();
const preferences = computed(()=>useAuthStore().authUser?.genres)
const recommenderByBookmarks =
    computed<Media[]>(()=>recommender.recommenderByBookmarks?.recommended)
const recommenderByGenres = computed<Media[]>(()=>recommender.recommenderByGenres)
</script>


<template>
  <div class="max-w-[1410px] mx-auto">
    <div >
      <h1 class="text-center heading-l p-4 m-6">Our recommendations for you</h1>
    </div>
    <AppCarsousel v-if="recommenderByGenres?.length">
      <template #title>
        Recommendation based on your Profile preferences
      </template>
      <MediaCard
          v-for="i of recommenderByGenres"
          :key="i.id"
          :item="i"
          type="movie"
          class="flex-1"
      />
    </AppCarsousel>
    <AppCarsousel v-if="recommenderByBookmarks?.length">
      <template #title>
        Similar to your bookmarks
      </template>
      <MediaCard
          v-for="i of recommenderByBookmarks"
          :key="i.id"
          :item="i"
          type="movie"
          class="flex-1"
      />
    </AppCarsousel>
    <div v-else-if="!recommenderByBookmarks?.length && !recommenderByGenres?.length &&
    preferences" class="flex flex-col items-center justify-center">
      <h2 class="p-4 mb-3 heading-m text-white/70">Can't find any recommendations  select your preferences now</h2>
      <button @click="recommender.getRecommendation()"
                class="w-[400px] text-center py-3 bg-myred/65 rounded-[8px] hover:bg-white hover:text-primary body-l tracking-wide text-white/90">Get some recommendations</button>
    </div>
    <div v-else-if="!recommenderByBookmarks?.length && !recommenderByGenres?.length &&
    !preferences" class="flex flex-col items-center justify-center">
      <h2 class="p-4 mb-3 heading-m text-white/70">Can't find any recommendations  select your preferences now</h2>
      <NuxtLink to="/profile" class="w-[300px] text-center py-3 bg-myred/65 rounded-[8px] hover:bg-white hover:text-primary body-l tracking-wide text-white/90">Select preferences</NuxtLink>
    </div>
  </div>


</template>