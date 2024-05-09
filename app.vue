<script lang="ts" setup>
	const authStore = useAuthStore();
  const profileStore = useProfileStore();
	await authStore.checkIfStillLoggedIn();
	const isLoggedIn = computed(() => authStore.loggedIn);
	watch(isLoggedIn, () => {
		authStore.getAuthUser()
	});
</script>
<template>
	<div class="overflow-hidden min-h-dvh">
		<NuxtLayout>
			<NuxtPage/>
		</NuxtLayout>
	</div>
</template>
