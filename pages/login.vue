<script lang="ts" setup>
	const { defineField, handleSubmit, errors, validate } = useForm({
		validationSchema: loginSchema,
	});

	const authStore = useAuthStore();

	const [email, emailAttrs] = defineField("email");
	const [password, passwordAttrs] = defineField("password");
	const onSubmit = handleSubmit(async (values) => {
		const { valid } = await validate();
		if (valid) {
		authStore.login(values);
		}
	});
</script>

<template>
	<div class="min-h-[650px] flex items-center justify-center">
		<section class="bg-primary rounded-[20px] p-8 max-w-[400px]  w-full">
			<h1 class="heading-m">Login</h1>
			<form class="mt-10 mb-6" @submit.prevent="onSubmit">
				<input
					type="email"
					autocomplete="email"
					placeholder="Email Address"
					aria-label="Email Address"
					aria-required="true"
					v-model="email"
					v-bind="emailAttrs"
				/>
				<p class="error-msg" v-if="errors.email">{{ errors.email }}</p>
				<input
					type="password"
					autocomplete="current-password"
					placeholder="Password"
					aria-label="Password"
					aria-required="true"
					class="mt-5"
					v-model="password"
					v-bind="passwordAttrs"
				/>
				<p class="error-msg" v-if="errors.password">{{ errors.password }}</p>
				<p class="error-msg" v-if="authStore.loginErr">Invalid credentials.</p>
				<button
					type="submit"
					class="w-full py-4 bg-myred mt-10 rounded-[8px] hover:bg-white hover:text-primary"
				>
					Login to your account
				</button>
			</form>
			<div class="flex justify-center items-center">
				<h2>Don’t have an account?</h2>
				<NuxtLink to="/sign-up" class="ml-2 text-myred"> Sign Up </NuxtLink>
			</div>
		</section>
	</div>
</template>
