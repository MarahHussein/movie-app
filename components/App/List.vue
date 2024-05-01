<script lang="ts" setup>
	const props = defineProps<{
		query: QueryItem;
	}>();

	const item = await listMedia(props.query.type, props.query.query, 1);
</script>

<template>
	<AppGrid>
		<template #title> <h2 class="heading-l">{{ query.title }}</h2> </template>
		<template #more>
			<NuxtLink
				:to="`/${props.query.type}/category/${props.query.query}`"
				class="capitalize text-white body-l px-5 py-3 bg-[#FFFFFF20] rounded-[8px] hover:text-myred"
			>
				more
			</NuxtLink>
		</template>
		<MediaCard
			v-for="i of item?.results.slice(0, 12) || []"
			:key="i.id"
			:item="i"
			:type="props.query.type"
			flex-1
			w-40
			md:w-60
		/>
	</AppGrid>
</template>
