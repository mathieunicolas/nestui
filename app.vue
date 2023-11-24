<template>
  <UHeader>
    <template #left>
      <span class="text-xl font-semibold">CapyNest</span>
    </template>
    <template #right>
      <UColorModeToggle />
    </template>
    <template #center>
      <UInput v-model="gd.dbURL" />
    </template>
  </UHeader>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <USelect
            placeholder="Choisir un user"
            v-model="currUser"
            :options="gd.users"
            v-if="gd.users.length > 0"
            option-attribute="username"
            value-attribute="id"
          />
          <UDivider class="my-4" />
          <UNavigationLinks :links="nav" />
        </UAside>
      </template>
      <UPageBody>
        <NuxtPage />
      </UPageBody>
    </UPage>
  </UContainer>
  <UFooter />
</template>

<script setup>
const gd = useDataStore();
await gd.getAllUsers();
const currUser = ref();

const active =  "text-gray-900 dark:text-white before:bg-gray-100 dark:before:bg-gray-800"
const inactive = "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50"

const nav = [
  {
    label: "Users",
    to: "/",
  },
  {
    label: "Activités",
    to: "/my",
  },
];

watch(currUser, async () => {
  gd.currentUser = gd.selUser(parseInt(currUser.value));

  if (!gd.jwt || true) {
      const res = await $fetch(gd.dbURL + "/auth/login", {
        method: "post",
        credentials: "include",
        body: gd.currentUser,
      });
    gd.jwt = res.access_token;
  }

  await gd.getAllActivities();
  await navigateTo("/my");
});
</script>
