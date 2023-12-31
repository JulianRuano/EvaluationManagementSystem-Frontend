import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { apiUrl } from '../../helpers/apiUrl'

// SOLO GET

async function fetchEducator(uid) {
  const config = {
    withCredentials: true
  }
  console.log('se lo trajo del back')
  const response = await axios.get(
    `${apiUrl}/educators/getEducator/${uid}`,
    config
  )
  console.log(response)
  return response.data
}

export function useGetEducator(uid) {
  return useQuery({
    queryKey: ['docent', uid],
    queryFn: () => fetchEducator(uid)
  })
}
