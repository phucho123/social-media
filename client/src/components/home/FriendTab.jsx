import React from 'react'
import FriendCard from '../friend/FriendCard'
import FriendRequestCard from '../friend/FriendRequestCard'
import { useSelector } from 'react-redux'

const FriendTab = () => {
    const user = useSelector((state) => state.user.user.user);
    return (
        <div className='flex justify-center h-full overflow-y-auto no-scrollbar'>
            <div className='w-full lg:w-[60%] flex mt-2 gap-10'>
                <div className='min-w-[50%] flex flex-col gap-4'>
                    <p className='flex justify-center text-lg font-semibold items-center'>Friends</p>
                    {
                        user?.friends.length ? user?.friends.map((friend, index) => (
                            <div className=' p-2 rounded-lg hover:opacity-70 hover:scale-105' key={index}>
                                <FriendCard friendInfo={friend} />
                            </div>

                        )) : <div className='flex justify-center text-red-600'>
                            You not have friends
                        </div>
                    }
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <p className='flex justify-center text-lg font-semibold'>Friend Requests</p>
                    {
                        user?.friendRequests.length ? user?.friendRequests.map((friendRequest, index) => (
                            <FriendRequestCard friendRequestInfo={friendRequest} key={index} />
                        )) : <div className='flex justify-center text-red-600'>
                            You not have friend requests
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default FriendTab