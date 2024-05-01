<script setup lang="ts">
const id = useRouteParam<string>('id')
const person = await getPerson(id.value)

</script>

<template>
  <div>
    <PersonDetails :item="person" />
  </div>
</template>
