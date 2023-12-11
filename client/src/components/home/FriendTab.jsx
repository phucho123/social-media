import React from 'react'
import FriendCard from '../friend/FriendCard'
import FriendRequestCard from '../friend/FriendRequestCard'

const FriendTab = () => {
    return (
        <div className='flex justify-center h-full overflow-y-auto no-scrollbar'>
            <div className='w-full lg:w-[60%] flex items-start mt-2 gap-10'>
                <div className=' w-full flex flex-col gap-2'>
                    <p className='flex justify-center text-lg font-semibold'>Friends</p>
                    <div className='flex justify-center'>
                        Coming soon
                    </div>
                    {/* <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard />
                    <FriendCard /> */}
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <p className='flex justify-center text-lg font-semibold'>Friend Requests</p>
                    {/* <FriendRequestCard />
                    <FriendRequestCard />
                    <FriendRequestCard />
                    <FriendRequestCard />
                    <FriendRequestCard /> */}
                    <div className='flex justify-center'>
                        Coming soon
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FriendTab