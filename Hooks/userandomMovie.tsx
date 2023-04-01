import React from 'react'
import useSWRImmutable from 'swr/immutable'
import fetcher from '../lib/fetcher'
const useFetchUser = () => {
    const { data, error, isLoading } = useSWRImmutable('/api/randomVideo', fetcher)
    return { data, error, isLoading }
}

export default useFetchUser