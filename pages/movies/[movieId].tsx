import React from 'react'
import serverAuthhelper from '@/lib/serverAuthHelper'
import ReactPlayer from 'react-player'

import prismaClient from '@/lib/prisma'
interface MovieProps {
    data: Record<string, any> | null
}


const MovieId: React.FC<MovieProps> = ({ data }) => {
    if (!data) {
        return <p>
            Loading
        </p>
    }

    return (
        <p className='flex w-full h-full '>
            <video className='flex w-full h-full ' src={data.videoUrl} autoPlay controls ></video>
        </p>
    )

}

export default MovieId

export async function getServerSideProps(context: any) {
    try {
        let data;
        const { movieId } = context.query;
        const { currentUser } = await serverAuthhelper(context.req)
        if (!currentUser) {
            return {
                redirect: {
                    destination: '/Auth',
                    permanent: false,
                },
            }
        }
        const Movie = await prismaClient.movie.findUnique({
            where: {
                id: movieId,
            }
        });
        if (!Movie) {
            data = null
        }
        else {
            data = Movie
        }
        console.log(data)
        return {
            props: {
                data: data
            },
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/Auth',
                permanent: false,
            },
        }
    }
}
