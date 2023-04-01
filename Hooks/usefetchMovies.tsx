import React from 'react'
import useSWRImmutable from 'swr/immutable'
import fetcher from '../lib/fetcher'
const usefetchMovies = () => {
    const { data, isLoading, error } = useSWRImmutable('/api/movies', fetcher)
    return { data, isLoading, error }
}

export default usefetchMovies