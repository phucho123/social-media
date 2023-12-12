import React, { useState } from 'react'
import { avatar } from '../assets'
import PostCard from '../components/post/PostCard'
import CreatePost from '../components/post/CreatePost'
import { CustomBtn } from '../components'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const user = JSON.parse(window.localStorage.getItem("user")).user;
    const posts = useSelector((state) => state.post.posts).filter((post) => post.userId._id == user._id);
    const navigate = useNavigate();
    return (
        <div>
            <div className='w-full flex justify-center flex-col items-center'>
                <div className='w-full lg:w-2/3 h-[100%]'>
                    <div className='w-full h-[32vh] rounded-b-lg text-red-400 overflow-hidden flex justify-center'>
                        <Button style={{ position: "absolute", left: 10, top: 10, border: "2px solid blue", borderRadius: "25px" }}
                            onClick={() => {
                                navigate("/");
                            }}>
                            <ArrowBackIcon />
                        </Button>
                        <img src={`https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1702339200&semt=ais`} alt='404'
                            className="h-[100%] rounded-lg w-full" />
                    </div>
                    <div className='w-full flex justify-center p-2 mt-[-10vh]'>
                        <img src={avatar} alt="404" className='rounded-full w-1/3 sm:w-1/4 lg:w-1/6 p-2 bg-black ' />
                    </div>
                </div>
                <div>
                    <p className='font-bold text-lg font-sans mb-4 z-20'>{user.firstName + " " + user.lastName}</p>
                </div>
                <div className='mb-8' >
                    <CustomBtn label={"+ Add friend"} styles={"bg-blue-600 p-2 rounded-lg hover:bg-blue-900"} />
                </div>
                <div className='w-full lg:w-2/3 flex gap-8 justify-center'>
                    <div className='w-full sm:w-2/3 flex flex-col gap-8 px-2'>
                        <CreatePost />
                        {
                            posts.length ? posts.map((post, index) => (
                                <PostCard postInfo={post} key={index} />
                            )) : <div></div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Profile