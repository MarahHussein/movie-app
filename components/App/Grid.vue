<script setup lang="ts"></script>

<template>
	<section class="max-w-[1299px] mx-auto mt-5 mb-7">
		<div class="flex py-3 px-10 items-center justify-between">
			<slot name="title" />
			<slot name="more" />
		</div>
		<div class="relative">
			<div>
				<div class="flex flex-wrap items-center justify-center gap-y-6">
					<slot />
				</div>
			</div>
		</div>
	</section>
</template>
