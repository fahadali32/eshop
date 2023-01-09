import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios'

export function useUser() {
  const fetcher = async () => {
    const result = await axios.get('/api/user', { withCredentials: true })
    console.log(result.data)
    return result.data
  }
  const { data, error } = useSWR('user', fetcher)

  return data
}
