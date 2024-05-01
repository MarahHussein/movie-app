<script lang="ts" setup>
	const { defineField, handleSubmit, errors, validate } = useForm({
		validationSchema: registerSchema,
	});

	const authStore = useAuthStore();

	const [name, nameAttrs] = defineField("name");
	const [email, emailAttrs] = defineField("email");
	const [password, passwordAttrs] = defineField("password");
	const [confirmPassword, confirmPasswordAttrs] =
		defineField("confirmPassword");

	const outputErr = computed(() => authStore.registerErr);

	const onSubmit = handleSubmit(async (values) => {
		const { valid } = await validate();
		if (valid) {
			authStore.createNewUser(values);
		}
	});
</script>

<template>
	<div class="min-h-[800px] flex items-center justify-center">
		<section class="bg-primary rounded-[20px] p-8 max-w-[400px] w-full">
			<h1 class="heading-m">Sign Up</h1>
			<form class="mt-10 mb-6"  @submit.prevent="onSubmit">
				<input
					type="text"
					placeholder="Username"
					autocomplete="given-name"
					aria-label="Username"
					aria-required="true"
					v-model="name"
					v-bind="nameAttrs"
					:class="{'input-error': errors.name}"
				/>
				<p class="error-msg" v-if="errors.name">{{ errors.name }}</p>
				<input
					type="email"
					autocomplete="email"
					placeholder="Email Address"
					aria-label="Email Address"
					aria-required="true"
					class="mt-5"
					v-model="email"
					v-bind="emailAttrs"
					:class="{'input-error': errors.email}"
				/>
				<p class="error-msg" v-if="errors.email">{{ errors.email }}</p>
				<input
					type="password"
					placeholder="Password"
					aria-label="Password"
					aria-required="true"
					class="mt-5"
					v-model="password"
					v-bind="passwordAttrs"
					:class="{'input-error': errors.password}"
				/>
				<p class="error-msg" v-if="errors.password">{{ errors.password }}</p>
				<input
					type="password"
					placeholder="Repeat Password"
					aria-label="Password"
					aria-required="true"
					class="mt-5"
					v-model="confirmPassword"
					v-bind="confirmPasswordAttrs"
					:class="{'input-error': errors.confirmPassword}"
				/>
				<p class="error-msg" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
				<p class="error-msg" v-if="outputErr">{{ outputErr }}</p>
				<button
					type="submit"
					class="w-full py-4 bg-myred mt-10 rounded-[8px] hover:bg-white hover:text-primary"
				>
					Sign up
				</button>
			</form>
			<div class="flex justify-center items-center">
				<h2>Already have an account?</h2>
				<NuxtLink to="/login" class="ml-2 text-myred"> Login </NuxtLink>
			</div>
		</section>
	</div>
</template>
