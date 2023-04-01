import React from 'react'
import useSWRImmutable from 'swr/immutable'
import fetcher from '../lib/fetcher'
const usefetchMovies = () => {
    const { data, isLoading, error, mutate } = useSWRImmutable('/api/favourites', fetcher)
    return { data, isLoading, error, mutate }
}

export default usefetchMovies