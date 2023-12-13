import React, { useEffect, useState } from 'react'
import { avatar } from '../assets'
import CreatePost from '../components/post/CreatePost'
import { CustomBtn } from '../components'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../utils/api'
import Loading from '../components/utils/Loading'
import PostCard from '../components/post/PostCard'

const Profile = () => {
    const userStorage = JSON.parse(window.localStorage.getItem("user"));
    const [user, setUser] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiRequest({
                    method: "GET",
                    url: `/users/get-by-id/${id}`,
                })

                if (res.status == 200) {
                    setUser(res.data);
                    console.log(res.data);
                } else {
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
            }

        }

        fetchData();

    }, [id])


    const posts = useSelector((state) => state.post.posts).filter((post) => {
        if (user) return post.userId._id == user._id
    });
    const navigate = useNavigate();
    return (
        user ? <div>
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
                    {userStorage.user._id != id && <CustomBtn label={"+ Add friend"} styles={"bg-blue-600 p-2 rounded-lg hover:bg-blue-900"} />}
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
        </div> : <Loading />
    )
}


export default Profile