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
import { Button, Typography, Popover } from '@mui/material'
import { toggleImageModal } from '../redux/reducer/modalSlice'
import { uploadImage } from '../utils'
import { updateUser } from '../redux/reducer/userSlice'
import { loadingFullScreen } from '../redux/reducer/loadingSlice'

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
        // const image = new Image();
        // image.onload = () => {
        //     if (image.height > image.width) setAvatarTransform(0);
        //     else setAvatarTransform(1);
        // }
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(file.preview);
        setAvatar(file);
        e.target.value = null;
        // image.src = file.preview;
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

            if (res.status === 200) {
                dispatch(updateUser(res.data));
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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);

    useEffect(() => {
        // const image = new Image();
        // image.onload = () => {
        //     if (image.height > image.width) setAvatarTransform(0);
        //     else setAvatarTransform(1);
        // }
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
                        <img src={background} alt='404'
                            className=" rounded-lg w-full" />
                    </div>
                    <div className='w-full flex justify-center p-2 mt-[-10vh] relative cursor-pointer' onClick={handleOpenPopover} >
                        <div className='rounded-full aspect-square w-1/3 sm:w-1/4 lg:w-1/6 bg-black flex justify-center items-center overflow-hidden' >
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
                </div>
                {openConfirmChangeAvatar && <div className='flex gap-2'>
                    <Button onClick={async () => {
                        await handleChangeAvatar()
                        setOpenConfirmChangeAvatar(false);

                    }}>Confirm</Button>
                    <Button sx={{ color: 'red' }} onClick={() => {
                        setAvatar({ preview: user.profileUrl });
                        setOpenConfirmChangeAvatar(false);
                    }} >Cancel</Button>
                </div>}
                <div>
                    <p className='font-bold text-lg font-sans mb-4 z-20'>{user.firstName + " " + user.lastName}</p>
                </div>
                <div className='mb-8' >
                    {userStorage.user._id != id && <CustomBtn label={"+ Add friend"} styles={"bg-blue-600 p-2 rounded-lg hover:bg-blue-900"} />}
                </div>
                <div className='w-full lg:w-2/3 flex gap-8 justify-center'>
                    <div className='w-full sm:w-2/3 flex flex-col gap-8 px-2'>
                        {(userStorage.user._id == id) && <CreatePost />}
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