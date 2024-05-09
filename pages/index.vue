<script setup lang="ts">

const simpleMovies =ref<(Media[])>()
const recommender = useRecommenderStore();
const simpleMoviesIds = computed(()=>recommender.simple)

watch(simpleMoviesIds, async ()=>{
  simpleMovies.value = await updateMedias(simpleMoviesIds.value)
})
</script>


<template>
	<div>
		<h1>Welcome to our app</h1>
	</div>
  <AppCarsousel v-if="simpleMovies?.length">
    <template #title>
      Our Recommendations
    </template>
    <MediaCard
        v-for="i of simpleMovies"
        :key="i.id"
        :item="i"
        type="movie"
        class="flex-1"
    />
  </AppCarsousel>
  <AppCarsousel v-if="simpleMovies?.length">
    <template #title>
      Recommendation based on your Profile preferences
    </template>
    <MediaCard
        v-for="i of simpleMovies"
        :key="i.id"
        :item="i"
        type="movie"
        class="flex-1"
    />
  </AppCarsousel>
</template>