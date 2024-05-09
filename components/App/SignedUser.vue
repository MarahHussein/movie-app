<script lang="ts" setup>
	import { vOnClickOutside } from "@vueuse/components";
	const authStore = useAuthStore();
	const { refValue, toggle, close } = useToggle();
	const user = computed(() => authStore.authUser);
	authStore.checkIfStillLoggedIn();
</script>

<template>
	<div v-if="user" class="relative" v-on-click-outside="close">
		<div
			class="h-full cursor-pointer flex items-center justify-center"
			@click="toggle"
		>
			<NuxtImg
				class="avatar"
				:src="user.avatar"
				:alt="`${user.name} profile picture`"
				height="50"
				width="50"
			/>
		</div>
		<ul
			:class="{ block: refValue, hidden: !refValue }"
			class="absolute bg-primary rounded-md p-2 min-w-[250px] bottom-[-10px] translate-y-full right-[10px] z-20 shadow-md border-2 border-white/20"
		>
			<div
				class="flex items-center justify-center pb-4 border-b border-gray-200/25"
			>
				<NuxtImg
					class="avatar"
					:src="user.avatar"
					:alt="`${user.name} profile picture`"
					height="35"
					width="35"
				/>
				<span class="pl-6 text-xl font-medium text-white/99 tracking-wider">{{
					user.name
				}}</span>
			</div>
			<li >
				<NuxtLink to="/profile" class="fa-btn">
					<fai class="fa-icon" icon="user"></fai>

					<span class="fa-text">profile</span>
				</NuxtLink>
			</li>
			<li >
				<button type="button" @click="authStore.logout()" class="fa-btn">
					<fai class="fa-icon" icon="right-from-bracket"></fai>
					<span class="fa-text">Log out</span>
				</button>
			</li>
		</ul>
	</div>
</template>
