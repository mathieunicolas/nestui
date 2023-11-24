
export const useSendData = async(user) => {
const gd = useDataStore()
console.log(user);

const res = await $fetch(gd.dbURL+'/users',{
      method: "post",
      body: user,
  })
console.log(res);
}

export const useGetAllUsers = async() => {
const gd = useDataStore()
const { data, pending, error, refresh } = await useFetch(gd.dbURL+'/users',{
      method: 'get'
})
  return data.value
}

export const useDelUser = async(id) => {
const gd = useDataStore()
const { data, pending, error, refresh } = await useFetch(gd.dbURL+'/users/'+id,{
      method: 'delete'
  })
  return data.value
}

export const useUpdateUser = async(id) => {
const gd = useDataStore()
const res = await $fetch(gd.dbURL+'/users/'+id,{
      method: 'patch',
      body: gd.selUser(id)
})
  return res
}