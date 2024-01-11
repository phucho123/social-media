import React from 'react'
import { avatar } from '../../assets'
import { Link } from 'react-router-dom'

const FriendCard = ({ friendInfo }) => {
    return (
        <Link className='flex w-full items-center gap-2 mb-5 justify-between px-2' to={`/profile/${friendInfo._id}`}>
            <div className='flex items-center gap-2'>
                <img src={friendInfo.profileUrl ? friendInfo.profileUrl : avatar} alt="404" className='object-cover w-14 h-14 rounded-full' />
                <p className='text-lg font-semibold'>{friendInfo.firstName + " " + friendInfo.lastName}</p>
            </div>
            {/* <p className='text-red-600'>Offline</p> */}
        </Link>
    )
}

export default FriendCard