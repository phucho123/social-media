import CreatePost from "../post/CreatePost";
import FriendCard from "../friend/FriendCard";
import FriendRequestCard from "../friend/FriendRequestCard";
import PostCard from "../post/PostCard";
import ProfileCard from "../profile/ProfileCard";
import React from 'react'
import { useSelector } from "react-redux";

const HomeTab = () => {
    const posts = useSelector((state) => state.post.posts);
    const user = useSelector((state) => state.user.user.user);
    // console.log(user);
    return (
        <div className='w-full gap-2 lg:gap-4 h-full pb-0 flex'>
            {/* LEFT */}
            <div className='pt-4 hidden w-[40%] lg:w-[25%] h-full md:flex flex-col gap-6 overflow-y-auto no-scrollbar text-black pb-5'>
                <ProfileCard />
            </div>
            {/* CENTER */}
            <div className='flex-1 h-full px-1 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-20 pt-4'>
                <CreatePost />
                {
                    posts.length ? posts.map((post, index) => (
                        <PostCard postInfo={post} key={index} />
                    )) : <div></div>
                }
            </div>
            {/* RIGHT */}
            <div className='hidden lg:flex w-[30%] flex-col gap-8 overflow-y-auto no-scrollbar text-black items-end pt-4'>
                <div className='w-[95%] rounded-l-md bg-white text-black shadow-md p-4 flex flex-col gap-5'>
                    <div className='flex items-center justify-between border-b border-gray-300 border-opacity-20 pb-3'>
                        <p className=''>Friend Requests</p>
                        <p>{user.friendRequests.length}</p>
                    </div>
                    {
                        user.friendRequests.map((friendRequest, index) => (
                            <FriendRequestCard friendRequestInfo={friendRequest} key={index} />
                        ))
                    }

                </div>

                <div className='w-[95%] rounded-l-md bg-white shadow-md pd-4 flex flex-col items-center px-5 py-5'>
                    <div className='w-full border-b border-black border-opacity-20 pb-5 flex justify-between gap-5 mb-5'>
                        <p>Friends</p>
                        <p>{user.friends.length}</p>
                    </div>
                    {
                        user.friends.map((friend, index) => (
                            <FriendCard friendInfo={friend} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeTab
