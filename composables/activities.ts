export const useGetAllActivities = async() => {
  const gd = useDataStore()

  const { data, pending, error, refresh } = await useFetch(gd.dbURL+'/activities',{
    method: 'get',
    credentials: 'include',
    headers: {
          Authorization: `Bearer ${gd.jwt}`
        }
    })
    
    return data.value ?? []
}