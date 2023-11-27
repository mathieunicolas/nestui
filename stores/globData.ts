import { useGetAllActivities } from "../composables/activities"

export const useDataStore = defineStore('globData', () => {
  const users = ref([])
  const dbURL = ref('https://api.nicolas.zone')
  const currentUser = ref()
  const jwt = ref()
  const activities = ref([])

  const getAllUsers = async () => {
    users.value = await useGetAllUsers()
  }

  const getAllActivities = async () => {
    activities.value = await useGetAllActivities()
  }

  const selUser = (userID: number) => {
    return users.value.find(el => el.id === userID)
  }

  const updateUser = async (userID: number) => {
    return await useUpdateUser(userID)
  }

  return { dbURL, users, activities, currentUser, jwt, getAllUsers, getAllActivities, selUser, updateUser }
})