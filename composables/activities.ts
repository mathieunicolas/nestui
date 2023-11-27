export const useGetAllActivities = async() => {
  const gd = useDataStore()

  const rs = await $fetch(gd.dbURL + '/activities', {
    method: 'get',
    credentials: 'include'
  })
  
  // const { data, pending, error, refresh } = await useFetch(gd.dbURL+'/activities',{
  //   method: 'get',
  //   credentials: 'include'
  //   })
    
    return rs ?? []
}