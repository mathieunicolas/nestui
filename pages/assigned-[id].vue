<template>
  <UTable :rows="data">
  <template #author-data="{ row }">
  {{ row.author.username }}
  </template>
  </UTable>
</template>

<script lang="ts" setup>
const actiId = useRoute().params['id']
const gd = useDataStore()

const { data } = await useFetch(`${gd.dbURL}/activities/assigned/${actiId}`, {
  credentials: 'include'
})
</script>

<style>

</style>

