<template>
  <UCard class="mb-8">
    <h1 class="text-lg font-semibold text-center mb-4">
      GET all activities
      <UButton @click="gd.getAllActivities()" label="get data" variant="outline" />
    </h1>
    <UTable :rows="gd.activities" :columns="columns">
      <template #action-data="{ row }">
        <UButton icon="i-heroicons-trash" @click="delActi(row.id)" variant="soft" />
      </template>
      <template #author-data="{ row }">
        {{ row.author.username }}
      </template>
      <template #title-data="{ row }">
        <UButton variant="ghost" v-if="row.master === 0" :to="`assigned-${row.id}`">{{ row.title }}</UButton>
        <span v-else>{{ row.title }}</span>
      </template>
    </UTable>
  </UCard>

  <UPageGrid v-if="gd.currentUser">
    <div
      v-if="gd.currentUser.role === 0"
      class="flex flex-col justify-between gap-4 items-start border rounded-sm p-4"
    >
      <h1 class="text-lg font-semibold text-center">ELEVE : assigner une activité</h1>
      <UFormGroup label="Indiquer l'ID d'une activité">
        <UInput v-model="actiCode" />
      </UFormGroup>
      <UButton @click="assignActi()" label="post data" />
    </div>

    <div
      v-if="gd.currentUser.role === 1"
      class="flex flex-col justify-between gap-4 items-start border rounded-sm p-4"
    >
      <h1 class="text-lg font-semibold text-center">PROF : créer une activité</h1>
      <UFormGroup label="Titre">
        <UInput v-model="acti.title" />
      </UFormGroup>
      <UFormGroup label="Contenu">
        <UInput v-model="acti.content" />
      </UFormGroup>
      <UButton @click="sendData(acti)" label="post data" />
    </div>
  </UPageGrid>
</template>

<script lang="ts" setup>
const gd = useDataStore();

const actiCode = ref();

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Titre",
  },
  {
    key: "content",
    label: "Contenu",
  },
  {
    key: "author",
    label: "Auteur",
  },
  {
    key: "master",
    label: "Master",
  },
  {
    key: "action",
  },
];
const acti = ref({
  title: "Titre activité",
  content: "Blablabla",
});

const sendData = async (acti: any) => {
  await $fetch(gd.dbURL + "/activities", {
    method: "post",
    body: { ...acti, author: gd.currentUser.id },
  });
  gd.getAllActivities();
};

const delActi = async (actiID: number) => {
  await $fetch(gd.dbURL + "/activities/" + actiID, {
    method: "delete",
    body: { ...acti, author: gd.currentUser.id },
  });
  gd.getAllActivities();
};

const assignActi = async () => {
  await $fetch(gd.dbURL + "/activities/assign/" + actiCode.value, {
    method: "post",
    credentials: "include"
  });
  gd.getAllActivities();
};
</script>
