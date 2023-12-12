import React from 'react'

const Loading = ({ size }) => {
    const sizeLoading = size ? size : 8;
    return (
        <div className='flex justify-center items-center text-blue-600'>
            <div
                className={`inline-block h-${sizeLoading} w-${sizeLoading} animate-spin rounded-full border-${sizeLoading / 2} border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
                role="status">
            </div>
        </div>
    )
}

export default Loading