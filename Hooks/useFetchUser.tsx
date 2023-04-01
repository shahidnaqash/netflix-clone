import React from 'react'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
const useFetchUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/getuser', fetcher)
    return { data, error, isLoading, mutate }
}

export default useFetchUser