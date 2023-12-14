import React from 'react'
import { avatar } from '../../assets'
import moment from 'moment'

const Comment = ({ commentInfo }) => {
    return (
        <div className='w-full'>
            <div className='flex gap-2 items-center text-white '>
                <img src={avatar} alt="404" className='rounded-full w-[6%] ' />
                <div>
                    <div className='font-bold'>{commentInfo.from}</div>
                    <div className='text-gray-300'>{moment(commentInfo.createdAt).fromNow()}</div>
                </div>
            </div>
            <div className='bg-white p-2 mt-2 rounded-lg inline-block break-all '>
                <span>{commentInfo.comment}</span>
            </div>
        </div>
    )
}

export default Comment