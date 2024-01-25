import React from 'react'
import { avatar } from '../../assets'
import { Link } from 'react-router-dom'

const FriendCard = ({ friendInfo }) => {
    return (
        <Link className='flex w-full items-center gap-2 mb-5 justify-start px-2 py-1 rounded-xl hover:bg-gray-300 hover:bg-opacity-50' to={`/profile/${friendInfo._id}`}>
            <div className='flex items-center gap-2'>
                <img src={friendInfo.profileUrl ? friendInfo.profileUrl : avatar} alt="404" className='object-cover aspect-square w-14 rounded-full flex' />
                <p className='text-lg font-semibold'>{friendInfo.firstName + " " + friendInfo.lastName}</p>
            </div>
            {/* <p className='text-red-600'>Offline</p> */}
        </Link>
    )
}

export default FriendCard