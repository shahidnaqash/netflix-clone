
import React, { useMemo, useCallback } from 'react'
import { BsPlus, BsCheck } from 'react-icons/bs';
import axios from 'axios';
import useFetchUser from '@/Hooks/useFetchUser';
import useFavourites from '@/Hooks/useFavourites';

interface FavProps {
    movieId: string
}
const FavBtn: React.FC<FavProps> = ({
    movieId
}) => {
    const { mutate: favMutate } = useFavourites()
    const { data: currentUser, mutate: userMutate } = useFetchUser()

    const isFav = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId)
    }, [currentUser, movieId])

    const toggleFav = useCallback(
        async () => {
            let resp;
            if (isFav) {
                resp = await axios.delete('/api/favourite', {
                    data: {
                        movieId
                    }
                })

            }
            else {
                await axios.post('/api/favourite', {
                    movieId
                })
            }
            const updatedFav = resp?.data?.favoriteIds;
            userMutate({
                ...currentUser,
                favoriteIds: updatedFav
            })

            favMutate()
        },
        [movieId, userMutate, favMutate, isFav],
    )
    const Icon = isFav ? BsCheck : BsPlus
    return (
        <div
            onClick={toggleFav}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
        </div>
    )
}

export default FavBtn