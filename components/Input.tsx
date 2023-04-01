import React from 'react'
import { Interface } from 'readline/promises'

interface InputProps {
    Id: string;
    value: string;
    onChange: any;
    type?: string;
    label: string;
    error: string | null;
}

const Input: React.FC<InputProps> = ({
    Id,
    value,
    onChange,
    type,
    label,
    error
}) => {
    return (
        <div
            className='relative'>
            <input autoComplete="off"
                id={Id}
                type={type}
                onChange={onChange}
                value={value}
                className={`
                    ${error && 'border border-red-700 '}
                    rounded-md
                    px-6
                    pb-1
                    pt-6
                    w-full
                    text-md
                    text-white
                    bg-neutral-700
                    bg-opacity-70
                    appearence-none
                    focus:outline-none
                    focus:ring-0
                    peer
                    `
                }
                placeholder=' '
            />
            <label htmlFor={Id}
                className='
                        absolute
                        text-md
                        text-zinc-400
                        duration-150
                        transform
                        -translate-y-3
                        scale-75
                        top-4
                        z-10
                        origin-[0]
                        left-6
                        peer-placeholder-shown:scale-100
                        peer-placeholder-shown:translate-y-0
                        peer-focus:scale-75
                        peer-focus:-translate-y-3
                '
            >
                {label}
            </label>
        </div>
    )
}

export default Input