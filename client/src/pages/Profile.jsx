import React, { useEffect, useState } from 'react'
import { avatar, background } from '../assets'
import CreatePost from '../components/post/CreatePost'
import { CustomBtn } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../utils/api'
import Loading from '../components/utils/Loading'
import PostCard from '../components/post/PostCard'
import { Button, Typography, Popover, Chip } from '@mui/material'
import { toggleImageModal } from '../redux/reducer/modalSlice'
import { uploadImage } from '../utils'
import { updateUser } from '../redux/reducer/userSlice'
import { loadingFullScreen } from '../redux/reducer/loadingSlice'
import { MdDone } from 'react-icons/md'
import { setPost } from '../redux/reducer/postSlice'
import { IoLocationOutline } from 'react-icons/io5'
import { BsBriefcase } from 'react-icons/bs'

const Profile = () => {
    const userStorage = useSelector(state => state.user.user);
    const [user, setUser] = useState(null);
    const [profileAvatar, setAvatar] = useState(user ? { preview: user.profileUrl } : { preview: avatar });
    const [avatarTransform, setAvatarTransform] = useState(0);
    const [openConfirmChangeAvatar, setOpenConfirmChangeAvatar] = useState(false);
    let avatarImage = new Image();
    avatarImage.onload = () => {
        if (avatarImage.height > avatarImage.width) setAvatarTransform(0);
        else setAvatarTransform(1);
    }
    const { id } = useParams();
    const dispatch = useDispatch();


    const handleUploadAvatar = (e) => {
        if (e.target.files.length === 0) return;
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(file.preview);
        setAvatar(file);
        e.target.value = null;
        avatarImage.src = file.preview;
        handleClosePopover();
        setOpenConfirmChangeAvatar(true);
    }
    const handleChangeAvatar = async () => {
        try {
            dispatch(loadingFullScreen(true));
            const secure_url = await uploadImage(profileAvatar);

            const res = await apiRequest({
                url: "/users/change-avatar",
                data: {
                    preAvatarUrl: userStorage.user.profileUrl,
                    newAvatarUrl: secure_url,
                },
                method: "POST",
                token: userStorage.token
            });

            const resPosts = await apiRequest({
                url: "/posts/get-posts",
                method: "GET"
            });

            if (res.status === 200 && resPosts.status == 200) {
                dispatch(updateUser(res.data));
                dispatch(setPost(resPosts.data));
            }
            dispatch(loadingFullScreen(false));

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        return () => {
            profileAvatar && URL.revokeObjectURL(profileAvatar.preview);
        }
    }, [profileAvatar]);

    ////Popover/////

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const openPopover = Boolean(anchorEl);

    useEffect(() => {
        avatarImage.src = profileAvatar.preview;
        const fetchData = async () => {
            try {
                const res = await apiRequest({
                    method: "GET",
                    url: `/users/get-by-id/${id}`,
                })

                if (res.status == 200) {
                    setUser(res.data);
                    setAvatar({ preview: res.data.profileUrl });
                    avatarImage.src = res.data.profileUrl;
                    // console.log(res.data);
                } else {
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
            }

        }

        fetchData();

    }, [id]);

    const handleSendFriendRequest = async () => {
        try {
            const res = await apiRequest({
                url: "/users/send-friend-request",
                method: "POST",
                data: {
                    to: id
                },
                token: userStorage.token,
            });
            if (res.status == 200) {
                dispatch(updateUser(res.data));
            }

        } catch (err) {
            console.log("fdsfds");
            console.log(err);
        }
    }

    const handleDeleteFriendRequest = async () => {
        try {
            const res = await apiRequest({
                url: "/users/delete-friend-request",
                method: "POST",
                data: {
                    to: id,
                    from: userStorage.user._id
                },
                token: userStorage.token,
            });
            if (res.status == 200) {
                dispatch(updateUser(res.data));
            }

        } catch (err) {
            console.log(err);
        }
    }

    const posts = useSelector((state) => state.post.posts).filter((post) => {
        if (user) return post.userId._id == user._id
    });
    const navigate = useNavigate();
    return (
        user ? <div className='overflow-y-auto h-full'>
            <div className='w-full flex min-h-screen flex-col items-center text-black bg-[#f1f1f1] pb-20'>
                <div className='w-full flex justify-center shadow-md bg-white'>
                    <div className='w-full lg:w-2/3 h-[100%]'>
                        <div className='w-full h-[32vh] rounded-b-lg text-red-400 overflow-hidden flex justify-center'>
                            {/* <Button style={{ position: "fixed", left: 10, top: 10, border: "2px solid blue", borderRadius: "25px" }}
                                onClick={() => {
                                    navigate(-1);
                                }}>
                                <ArrowBackIcon />
                            </Button> */}
                            <img src={background} alt='404'
                                className=" rounded-b-lg w-full" />
                        </div>
                        <div className='w-full flex justify-center p-2 mt-[-10vh] relative'  >
                            <div className='rounded-full aspect-square w-1/3 sm:w-1/4 lg:w-1/6 bg-black flex justify-center items-center overflow-hidden cursor-pointer' onClick={handleOpenPopover}>
                                <img src={profileAvatar.preview ? profileAvatar.preview : avatar} alt="404" className={`rounded-full ${avatarTransform ? 'h-full' : 'w-full'}`} />
                            </div>
                        </div>

                        <Popover
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div onClick={() => {
                                dispatch(toggleImageModal({
                                    open: true,
                                    imageUrl: profileAvatar.preview ? profileAvatar.preview : avatar
                                }));
                                handleClosePopover()
                            }}>
                                <Typography sx={{ p: 1, cursor: "pointer" }}>See Avatar</Typography>
                            </div>
                            {userStorage.user._id == id && <div>

                                <label className='' htmlFor='uploadavatar' >
                                    <input type='file' className='hidden' id="uploadavatar" data-max-size='5120' accept='.jpg, .png, .jpeg'
                                        onChange={handleUploadAvatar} />
                                    <Typography sx={{ p: 1, cursor: "pointer" }}>Change Avatar</Typography>
                                </label>

                            </div>}
                        </Popover>
                        {openConfirmChangeAvatar && <div className='flex gap-2 justify-center'>
                            <Button onClick={async () => {
                                await handleChangeAvatar()
                                setOpenConfirmChangeAvatar(false);

                            }}>Confirm</Button>
                            <Button sx={{ color: 'red' }} onClick={() => {
                                setAvatar({ preview: user.profileUrl });
                                setOpenConfirmChangeAvatar(false);
                            }} >Cancel</Button>
                        </div>}
                        <div className='flex justify-center flex-col items-center mb-2'>
                            <p className='font-bold text-lg font-sans z-20 text-center'>{user.firstName + " " + user.lastName}</p>
                            {userStorage.user._id != id && userStorage.user.friends?.some(friend => friend._id == id) && <Chip
                                label="Friend"
                                icon={<MdDone />}
                                color="success"
                            />}
                            <div className='mb-8' >
                                {userStorage.user._id != id && !userStorage.user.friendRequestings?.includes(id) && !userStorage.user.friends?.some(friend => friend._id == id) && <CustomBtn label={"+ Add friend"} styles={"bg-blue-600 p-2 rounded-lg hover:bg-blue-900 text-white"} onClick={handleSendFriendRequest} />}
                                {userStorage.user._id != id && userStorage.user.friendRequestings?.includes(id) && <div>
                                    <Button color='error' variant="contained" onClick={handleDeleteFriendRequest} >Cancel Friend Request</Button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col md:w-2/3 lg:flex-row  pt-4 gap-4'>
                    <div className='w-full flex flex-col px-2  lg:w-[40%] h-full bg-white shadow-md rounded-md pt-2'>
                        <div className='flex items-center gap-2 mb-4'>
                            <IoLocationOutline style={{ color: "blue" }} size={22} />
                            <span>{user.location ? user.location : "Add Location"}</span>
                        </div>
                        <div className='flex items-center gap-2 mb-4'>
                            <BsBriefcase style={{ color: "blue" }} size={22} />
                            <span>{user.profession ? user.profession : "Add Profesional"}</span>
                        </div>
                    </div>
                    <div className='w-full flex justify-center lg:w-[60%]'>
                        <div className='w-full flex gap-8 justify-center'>
                            <div className='w-full flex flex-col gap-8'>
                                {(userStorage.user._id == id) && <CreatePost />}
                                {
                                    posts.length ? posts.map((post, index) => (
                                        <PostCard postInfo={post} key={index} />
                                    )) : <div></div>
                                }
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div> : <Loading />
    )
}


export default Profile