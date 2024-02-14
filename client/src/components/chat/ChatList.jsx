import React from 'react'
import { useSelector } from 'react-redux'
import FriendCard from '../friend/FriendCard';
import { avatar } from '../../assets';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ChatList = ({ setOpen }) => {
    const user = useSelector((state) => state.user.user);
    // const chatId = user.user?.
    const { id } = useParams();
    return (
        <div className='bg-white pt-2 h-full shadow-md overflow-y-auto'>
            <p className='font-semibold text-2xl px-2 pb-4'>Chat</p>
            {
                user.user?.friends.length && user.user.friends.map((friend, index) => (
                    <Link className={`flex w-full items-center gap-2 mb-2 justify-start px-2 py-2 hover:bg-gray-300 hover:bg-opacity-50 cursor-pointer ${id == friend._id ? 'bg-gray-300 bg-opacity-50' : ""}`} key={index} to={`/chat/${friend._id}`} onClick={() => setOpen(true)}>
                        <div className='flex items-center gap-2'>
                            <img src={friend.profileUrl ? friend.profileUrl : avatar} alt="404" className='object-cover aspect-square w-14 rounded-full flex' />
                            <p className='text-lg font-semibold'>{friend.firstName + " " + friend.lastName}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default ChatList