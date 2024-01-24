import React, { forwardRef } from 'react'

const TextInput = ({
    name, type, label, labelStyle, placeholder, register, styles, errors
}, ref1) => {
    const { ref, ...rest } = register
    return (
        <div className='w-full flex flex-col'>
            {label && (
                <p className={`text-ascent-2 text-sm mb-2 ${labelStyle}`}>{label}</p>
            )}

            <div>
                <input
                    type={type}
                    name={name}
                    // ref={ref}
                    placeholder={placeholder}
                    className={`bg-secondary text-black rounded border border-[#66666690] focus:border-blue-600 focus:border-[3px] focus:border-opacity-50 outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
                    {...rest}
                    ref={(e) => {
                        ref(e);
                        if (ref1) ref1.current = e;
                    }}
                />
            </div>
            {errors && (
                <span className='text-xs text-[#f64949fe] mt-0.5 '>{errors}</span>
            )}
        </div>
    )
}

export default forwardRef(TextInput)