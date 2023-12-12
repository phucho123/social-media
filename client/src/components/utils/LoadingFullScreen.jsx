import React from 'react'
import Loading from './Loading'

const LoadingFullScreen = () => {
    return (
        <div className='bg-black fixed w-full h-screen z-[3000] opacity-50 flex justify-center items-center'>
            <Loading size={16} />
        </div>
    )
}

export default LoadingFullScreen