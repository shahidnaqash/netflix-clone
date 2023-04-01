import React from 'react'
// import { getSession } from "next-auth/next"
import authOptions from '@/pages/api/auth/[...nextauth]'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import { Navbar, Register, Billboard, MovieList } from "@/components";
import { getSession } from 'next-auth/react';
import usefetchMovies from '@/Hooks/usefetchMovies';
import useFavourites from '@/Hooks/useFavourites';
import useFetchUser from '@/Hooks/useFetchUser';

export default function Home() {
  const { data: movies = [] } = usefetchMovies();
  const { data: favMovies = [] } = useFavourites()
  const { data } = useFetchUser()

  return (
    <>
      {
        !data ? <Register /> : (
          <>
            <Navbar />
            <Billboard />
            <div className='pb-40'>
              <MovieList title='Trending Now' data={movies} />
              <MovieList title='WishList' data={favMovies} />
            </div>
          </>)
      }


    </>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context)
//   console.log(session)
//   if (session) {
//     return {
//       redirect: {
//         destination: '/profile',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }
