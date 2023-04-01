import React from 'react'

interface NavbaritemProps {
    label: string
}

const Navbaritem: React.FC<NavbaritemProps> = ({
    label
}) => {
    return (
        <div className='text-white cursor-pointer hover:text-gray-300 transition'>
            {label}
        </div>
    )
}

export default Navbaritem