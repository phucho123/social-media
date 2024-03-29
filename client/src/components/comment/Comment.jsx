import React, { useState } from 'react'
import moment from 'moment'
import { avatar } from '../../assets';

const Comment = ({ commentInfo }) => {
    const [avatarTransform, setAvatarTransform] = useState(0);
    let avatarImage = new Image();
    avatarImage.onload = () => {
        if (avatarImage.height > avatarImage.width) setAvatarTransform(0);
        else setAvatarTransform(1);
    }
    avatarImage.src = commentInfo.userId.profileUrl;

    return (
        <div className='w-full'>
            <div className='flex gap-2 items-center text-black'  >
                <div className='rounded-full aspect-square w-[48px] bg-black flex justify-center items-center overflow-hidden'>
                    <img src={commentInfo.userId.profileUrl ? commentInfo.userId.profileUrl : avatar} alt="404" className={`rounded-full ${avatarTransform ? 'h-full' : 'w-full'}`} />
                </div>

                <div>
                    <div className='font-bold hover:underline cursor-pointer'>{commentInfo.userId.firstName + " " + commentInfo.userId.lastName}</div>
                    <div className=' text-blue-600 hover:underline cursor-pointer'>{moment(commentInfo.createdAt).fromNow()}</div>
                </div>
            </div>
            <div className='bg-gray-200 p-2 mt-2 rounded-lg inline-block break-all cursor-pointer '>
                <span>{commentInfo.comment}</span>
            </div>
        </div>
    )
}

export default Comment