import React from 'react'
import { getServerSession } from "next-auth/next"
import authOptions from '@/pages/api/auth/[...nextauth]'
import type {
    GetServerSideProps,
    GetServerSidePropsContext,
} from "next";
import { getSession, signOut } from 'next-auth/react';
import useFetchUser from '@/Hooks/useFetchUser';
import Link from 'next/link';


const profile = () => {
    const { data, error, isLoading } = useFetchUser()
    console.log(data)
    return (
        <div className='flex items-center justify-center h-full'>
            <Link href={'/'}>

                <div

                    className='flex flex-col'>
                    <h1 className='text-3xl md:text-6xl text-white text-center'>
                        Who is Watching?
                    </h1>

                    <div className='flex items-center justify-center gap-8 mt-10 flex-col'>
                        <div className='' onClick={() => { }}>

                            <div className='group flex-col w-44 mx-auto'>
                                <div className='
                          w-44
                          h-44
                          rounded-md
                          flex
                          items-center
                          justify-center
                          border-2
                          border-transparent
                          group-hover:border-white
                          group-hover:cursor-pointer
                          overflow-hidden
                          '>
                                    <img src='/images/default-green.png' alt='whos watching' />
                                </div>
                                <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>
                                    {data?.name}

                                </div>
                            </div>


                        </div>
                        <button className='bg-red-500 px-6 my-5 py-2 text-white' onClick={() => signOut()}>signout</button>

                    </div>

                </div>
            </Link>

        </div>
    )
}

export default profile

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/Auth',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}