<script lang="ts" setup>
	const authStore = useAuthStore();
	const isLoggedIn = computed(() => authStore.loggedIn);
</script>

<template>
	<div class="bg-primary px-4 py-6">
		<header class="max-w-[1110px] mx-auto flex justify-between items-center">
			<img src="/images/logo.svg" alt="" class="mobile:hidden">
		<nav class="flex gap-6">
			<nuxt-link to="/">
				<img src="/public/images/icon-nav-home.svg" alt="Home Page">
			</nuxt-link>
			<nuxt-link to="/movie">
				<img src="/public/images/icon-nav-movies.svg" alt="Movies Page">
			</nuxt-link>
<!--			<nuxt-link to="/tv">-->
<!--				<img src="/public/images/icon-nav-tv-series.svg" alt="TV-series Page">-->
<!--			</nuxt-link>-->
			<nuxt-link to="/bookmarks">
				<img src="/public/images/icon-nav-bookmark.svg" alt="Bookmark Page">
			</nuxt-link>
			<nuxt-link to="/search">
				<fai icon="magnifying-glass" class="size-5 text-[#5A698F]"/>
			</nuxt-link>
		</nav>
		<div v-if="!isLoggedIn">
			<NuxtLink to="/login" class=" text-base tablet:text-xl hover:text-myred">Login</NuxtLink>
			<NuxtLink to="/sign-up" class="ml-2 tablet:ml-4 py-[6px] px-2 tablet:px-5 rounded-[4px] bg-white text-base tablet:text-xl text-primary hover:bg-[#FFFFFF90]">Sign up</NuxtLink>
		</div>
		<div v-else>
			<AppSignedUser/>
		</div>
	</header>
	</div>
	
</template>