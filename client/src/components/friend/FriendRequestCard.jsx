import React from 'react'
import { avatar } from '../../assets'
import CustomBtn from '../utils/CustomBtn'

const FriendRequestCard = () => {
    return (
        <div className='w-full flex justify-between flex-col gap-2 px-2'>
            <div className='flex items-center gap-2'>
                <img src={avatar} alt="404" className='object-cover w-14 h-14 rounded-full' />
                <div>
                    <p className='text-lg font-semibold'>Kirigaya Kirito</p>
                    <span className='text-sm opacity-40'>Hacker</span>
                </div>
            </div>
            <div className='flex items-center gap-2 justify-between'>
                <CustomBtn styles={"rounded-xl bg-blue-600 p-1 w-1/2 flex justify-center hover:bg-blue-900"} label={"Accept"} />
                <CustomBtn styles={"rounded-xl border p-1 w-1/2 flex justify-center hover:border-red-600 hover:text-red-600"} label={"Delete"} />
            </div>
        </div>
    )
}

export default FriendRequestCard