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
            <div className='flex gap-2 items-center text-white'  >
                <div className='rounded-full aspect-square w-[6%] bg-black flex justify-center items-center overflow-hidden'>
                    <img src={commentInfo.userId.profileUrl ? commentInfo.userId.profileUrl : avatar} alt="404" className={`rounded-full ${avatarTransform ? 'h-full' : 'w-full'}`} />
                </div>

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