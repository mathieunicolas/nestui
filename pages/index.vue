<template>
    <UCard>
        <h1 class="text-lg font-semibold text-center mb-4">GET all users
            <UButton @click="gd.getAllUsers()" label="get data" variant="outline" />
        </h1>
        <UTable :rows="gd.users" :columns="columns">
            <template #action-data="{ row }">
                <UButton icon="i-heroicons-trash" @click="delUser(row.id)" variant="soft" />
            </template>
            <template #role-data="{ row }">
                <USelect @change="roleChange($event, row.id)" v-model="row.role" :options="roles" option-attribute="label" value-attribute="id" />
            </template>
        </UTable>
    </UCard>
    <UCard>
        <h1 class="text-lg font-semibold text-center">Créer un utilisateur</h1>

        <div class="flex flex-col gap-4 mx-16">
        <UFormGroup label="username">
            <UInput v-model="user.username" />
        </UFormGroup>
        <UFormGroup label="password">
            <UInput v-model="user.password" />
        </UFormGroup>
        <UFormGroup label="rôle">
            <USelect :options="roles" v-model="user.role" option-attribute="label" value-attribute="id" />
        </UFormGroup>
            <UButton @click="sendData(user)" label="post data" class="self-center" />
        </div>
    </UCard>
</template>

<script setup>
const columns = [{
    key: 'id',
    label: 'ID'
},{
    key: 'username',
    label: 'username'
}, {
    key: 'password',
    label: 'password'
}, {
    key: 'role',
    label: 'Rôle'
}, {
    key: 'action',
    label: ''
}]

const roles = [{
    id: 0,
    label: 'élève'
},{
    id: 1,
    label: 'prof'
// },{
//     id: 2,
//     label: 'admin'
}]

const gd = useDataStore()

const user = ref({
    username: 'mathieu',
    password: 'mathieu',
    role: 0
})

const delUser = async (id) => {
    await useDelUser(id)
    gd.getAllUsers()
}

const sendData = async () => {
    await useSendData(user.value)
    gd.getAllUsers()
}

const roleChange = async (event, userID) => {
    const newRole = gd.selUser(userID).role
    gd.updateUser(userID)
}

</script>