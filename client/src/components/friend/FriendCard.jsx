import React from 'react'
import { avatar } from '../../assets'

const FriendCard = () => {
    return (
        <div className='flex w-full items-center gap-2 mb-5 justify-between px-2'>
            <div className='flex items-center gap-2'>
                <img src={avatar} alt="404" className='object-cover w-14 h-14 rounded-full' />
                <p className='text-lg font-semibold'>Kirigaya Kirito</p>
            </div>
            <p className='text-red-600'>Offline</p>
        </div>
    )
}

export default FriendCard