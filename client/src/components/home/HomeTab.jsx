import CreatePost from "../post/CreatePost";
import FriendCard from "../friend/FriendCard";
import FriendRequestCard from "../friend/FriendRequestCard";
import PostCard from "../post/PostCard";
import ProfileCard from "../profile/ProfileCard";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../../utils/api";
import { setPost } from "../../redux/reducer/postSlice";

const HomeTab = () => {
    const posts = useSelector((state) => state.post.posts);
    const user = useSelector((state) => state.user.user.user);
    // console.log(user);
    return (
        <div className='w-full gap-2 lg:gap-4 h-full pt-5 pb-10 flex'>
            {/* LEFT */}
            <div className='hidden w-[40%] lg:w-[25%] h-full md:flex flex-col gap-6 overflow-y-auto no-scrollbar'>
                <ProfileCard />
                <div className='w-full bg-[#25293c] rounded-xl pd-4 flex flex-col items-center px-5 py-5'>
                    <div className='w-full border-b border-white border-opacity-20 pb-5 flex justify-between gap-5 mb-5'>
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
            {/* CENTER */}
            <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto no-scrollbar'>
                <CreatePost />
                {
                    posts.length ? posts.map((post, index) => (
                        <PostCard postInfo={post} key={index} />
                    )) : <div></div>
                }
            </div>
            {/* RIGHT */}
            <div className='hidden lg:flex w-[30%] flex-col gap-8 overflow-y-auto no-scrollbar'>
                <div className='w-full bg-[#25293c] p-4 rounded-xl flex flex-col gap-5'>
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
            </div>
        </div>
    )
}

export default HomeTab
