import React, { useState, useCallback } from 'react'
import Navbaritem from './Navbaritem'
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs'
import MobileMenu from './MobileMenu'
import AccountMenu from './AccountMenu'
const Navbar = () => {
    const [showmbl, setshowmbl] = React.useState(false)
    const [showaccnt, setshowaccnt] = useState(false)
    const togglemblMenu = useCallback(() => {
        setshowmbl((current) => !current)
    }, [])
    const toggleaccntMenu = useCallback(() => {
        setshowaccnt((current) => !current)
    }, [])
    return (
        <nav className='fixed w-full z-30'>
            <div className='
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
         bg-zinc-900
            bg-opacity-90   
            '>
                <img src='/images/logo.png' alt='logo' className='h-4 lg:h-7' />
                <div className='
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex

                '>
                    <Navbaritem label='Home' />
                    <Navbaritem label='Series' />
                    <Navbaritem label='Films' />
                    <Navbaritem label='New' />
                    <Navbaritem label='WishList' />
                    <Navbaritem label='Browse by languages' />
                </div>
                <div
                    onClick={togglemblMenu}
                    className='
                lg:hidden
                flex
                flex-row
                items-center
                gap-2
                ml-8
                cursor-pointer
                relative
                '>
                    <p className='text-white text-sm'>Browse</p>
                    <BsChevronDown className={`text-white transition ${showmbl ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showmbl} />
                </div>
                <div className='flex flex-row ml-auto gap-7 items-center'>
                    <div className='text-gray-200 hover:text-gray-400 cursor-poiner'>
                        <BsSearch />
                    </div>
                    <div className='text-gray-200 hover:text-gray-400 cursor-poiner'>
                        <BsBell />
                    </div>
                    <div
                        onClick={toggleaccntMenu}
                        className='flex flex-row
                    items-center
                    gap-2
                    relative
                    cursor-pointer'>
                        <div className='w-6 h-6 lg:w-10 lg:h-10
                        rounded-md
                        overflow-hidden '>
                            <img src='/images/default-green.png' alt='profile' />
                        </div>
                        <BsChevronDown className={`text-white transition ${showaccnt ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showaccnt} />
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar