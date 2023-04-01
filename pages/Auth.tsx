import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getSession, signIn } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc';
import { getServerSession } from "next-auth/next"
import authOptions from '@/pages/api/auth/[...nextauth]'
import type {
    GetServerSideProps,
    GetServerSidePropsContext,
} from "next";


import { Input } from '../components'

function Auth() {
    const [email, setemail] = useState('')
    const [respError, setrespError] = useState('')
    const [password, setpassword] = useState('')
    const router = useRouter()
    const username = router?.asPath.split('=')[1];

    const handleRegistration = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/register', {
                username: username,
                email: email,
                password: password
            });
            if (response.status == 201) {
                const signinResponse = await signIn('credentials', { email: email, password: password, callbackUrl: '/profile' })

            }
            else {
                console.log(response.data.error)
                // setrespError(response.data.error)
            }
        } catch (e: any) {
            console.log(e)
            // setrespError(e.response.data.error)
        }
    }

    const handleLogin = async () => {
        try {
            const signinResponse = await signIn('credentials', { redirect: false, email: email, password: password })
            if (signinResponse?.ok) {
                router.replace('/')
            }
            else {
                setrespError(signinResponse?.error || '');

                console.log('Not successfull logedin', signinResponse)
            }

        } catch (e: any) {
            setrespError(e.response.data.error)
        }
    }

    return (
        <div className=' w-full relative bg-[url("/images/hero.jpg")] bg-no-repeat bg-fixed bg-cover bg-center '>
            <div className='bg-black w-full h-full  md:bg-opacity-40'>
                <nav className='px-12 py-5 '>
                    <img src='/images/logo.png' alt='logo' className='h-6 md:h-10 xlg:h-12' />
                </nav>
                <div className='flex justify-center'>
                    <div className='p-16 bg-black bg-opacity-70 self-center mt-2 md:w-3/5 lg:w-2/5 md:max-w-md w-full rounded-md'>
                        <h2 className='text-white font-semibold mb-8 text-3xl'>Sign In</h2>
                        <div className='flex flex-col gap-4'>

                            <Input Id='email' onChange={(e: any) => { setemail(e.target.value); setrespError('') }} value={email} type='email' label='Email' error={null} />
                            <Input Id='password' onChange={(e: any) => { setpassword(e.target.value) }} value={password} type='password' label='Password' error={null} />
                        </div>

                        {
                            username ? (<button
                                onClick={handleRegistration}
                                className='bg-red-600 text-white font-semibold rounded-md px-10 py-3  w-full mt-10'>
                                Register
                            </button>) : (
                                <>
                                    <button
                                        onClick={handleLogin}
                                        className='bg-red-600 text-white font-semibold rounded-md px-10 py-3  w-full mt-10'>
                                        Sign in
                                    </button>
                                    <button
                                        onClick={() => signIn('google', { callbackUrl: '/' })}
                                        className=' bg-white text-red font-semibold rounded-md px-10 py-3  w-full mt-10 flex flex-row justify-center'>
                                        <span><FcGoogle size={30} /></span>
                                    </button>

                                </>
                            )
                        }

                        <p className='text-neutral-500 mt-12'>
                            New to Netflix?
                            <span className='text-white font-medium hover:underline ml-2 cursor-pointer'>
                                <Link href={'/'}>
                                    Sign up now.
                                </Link>
                            </span>

                        </p>
                        {respError !== '' && <p className='text-white '>{respError}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (session) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}
