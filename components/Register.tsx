import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Input } from "@/components";


const Register = () => {
    const [name, setname] = useState('')
    const [error, seterror] = useState<string | null>(null)
    const router = useRouter()
    const handleClick = (e: React.SyntheticEvent) => {
        if (name == '') {
            seterror('username cannot be empty')
            return
        }

        router.push({
            pathname: '/Auth',
            query: {
                username: name
            }
        })
    }
    return (
        <div className="w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-center fixed ">
            <div className="w-full h-full bg-black bg-opacity-60 fixed">
                <nav className="flex justify-between items-center max-w-[1280px]  mx-auto my-4">
                    <img src="/images/logo.png" alt="logo" className="h-6 md:h-10 xlg:h-12 ml-10" />
                    <button className="px-2 md:px-4 py-1 md:py-1 mr-10 bg-[rgb(193,17,25)] text-white font-semibold hover:bg-red-700 md:rounded-md rounded-sm">
                        <Link href={'/Auth'}>
                            Sign in
                        </Link>
                    </button>
                </nav>
                <div className="max-w-[1280px] w-full h-full gap-5 text-white flex  flex-col mx-auto justify-center items-center px-10 ">
                    <h2 className="font-[900] text-[2rem] ">
                        Unlimited movies, TV shows, and more.
                    </h2>
                    <p className="font-normal text-[1.6rem]">
                        Watch anywhere. Cancel anytime.
                    </p>

                    <p className="font-small text-[1rem]">
                        Ready to watch? Enter your email to create or restart your membership.
                    </p>
                    <div className='flex flex-col md:flex-row gap-5 items-center'>
                        <Input Id='name' onChange={(e: any) => { setname(e.target.value); if (error) seterror(null) }} value={name} type='text' label='Name' error={error} />
                        <button onClick={handleClick} className='bg-red-600 hover:bg-red-700 text-white text-[1.1rem] font-bold md:text-[1.3rem] px-10 py-2 ml-5 rounded-md'>Get Started</button>
                    </div>

                </div>


            </div>

        </div>
    )

}

export default Register