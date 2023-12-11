import React, { forwardRef } from 'react'

const TextInput = forwardRef(({
    name, type, label, labelStyle, placeholder, register, styles, errors
}, ref) => {
    return (
        <div className='w-full flex flex-col mt-2'>
            {label && (
                <p className={`text-ascent-2 text-sm mb-2 ${labelStyle}`}>{label}</p>
            )}

            <div>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    ref={ref}
                    className={`bg-secondary text-black rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
                    {...register}
                />
            </div>
            {errors && (
                <span className='text-xs text-[#f64949fe] mt-0.5 '>{errors}</span>
            )}
        </div>
    )
})

export default TextInput