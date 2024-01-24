import React, { useEffect, useState } from 'react'
import { avatar } from '../../assets'
import TextInput from '../utils/TextInput'
import { CiImageOn, } from "react-icons/ci";
import { MdGifBox } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { deleteImage, uploadImage } from '../../utils';
import CustomBtn from '../utils/CustomBtn';
import { apiRequest } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../../redux/reducer/postSlice';
import { useForm } from 'react-hook-form';
import { loadingFullScreen } from '../../redux/reducer/loadingSlice';


const CreatePost = () => {
    const [image, setImage] = useState();
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const user = useSelector(state => state.user.user.user);
    const dispatch = useDispatch();
    const [avatarTransform, setAvatarTransform] = useState(0);
    let avatarImage = new Image();
    avatarImage.onload = () => {
        if (avatarImage.height > avatarImage.width) setAvatarTransform(0);
        else setAvatarTransform(1);
    }
    avatarImage.src = user.profileUrl;

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm(({
        mode: "onChange"
    }))
    // const [video, setVideo] = useState();
    // const [gif, setGif] = useState();
    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
            // video && URL.revokeObjectURL(video.preview);
            // gif && URL.revokeObjectURL(gif.preview);
        }
    }, [image]);

    const handleUploadImage = (e) => {
        if (e.target.files.length === 0) return;
        // setVideo(null);
        // setGif(null);
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(file.preview);
        setImage(file);
        e.target.value = null;
    }
    // const handleUploadVideo = (e) => {
    //     if (e.target.files.length === 0) return;
    //     setImage(null);
    //     setGif(null);
    //     const file = e.target.files[0];
    //     file.preview = URL.createObjectURL(file);
    //     console.log(file.preview);
    //     setVideo(file);
    //     e.target.value = null;
    // }
    // const handleUploadGif = (e) => {
    //     if (e.target.files.length === 0) return;
    //     setImage(null);
    //     setVideo(null);
    //     const file = e.target.files[0];
    //     file.preview = URL.createObjectURL(file);
    //     console.log(file.preview);
    //     setGif(file);
    //     e.target.value = null;
    // }

    const handleUploadToCloudinary = async () => {
        if (image) {
            const secure_url = await uploadImage(image);
            return secure_url;
        }
        return "";
    }

    const handlePost = async (description) => {
        if (!description) return;
        const imageUrl = await handleUploadToCloudinary();

        try {

            const res = await apiRequest({
                url: "/posts/create",
                data: {
                    description,
                    imageUrl,
                },
                method: "POST",
                token
            });

            if (res.status === 200) {
                dispatch(setPost(res.data));
            }

        } catch (err) {
            console.log(err);
        }

    }

    const onSubmit = async (data) => {
        console.log("Submited")
        dispatch(loadingFullScreen(true));
        await handlePost(data.description);
        dispatch(loadingFullScreen(false));
        image && URL.revokeObjectURL(image.preview);
        setImage(null);
        setValue("description", "");
    }

    const handleCancelPost = () => {
        image && URL.revokeObjectURL(image.preview);
        setImage(null);
    }

    return (
        <form className='w-full rounded-md bg-white shadow-md pb-2 px-2 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full pt-2 flex gap-2 border-b border-white border-opacity-20 pb-2 items-center justify-center'>
                <div className='rounded-full aspect-square w-14 bg-black flex justify-center items-center overflow-hidden'>
                    <img src={user.profileUrl ? user.profileUrl : avatar} alt="404" className={`rounded-full ${avatarTransform ? 'h-full' : 'w-full'}`} />
                </div>
                <TextInput
                    type={"text"}
                    name={"description"}
                    placeholder={"What are you thinking ?"}
                    register={register("description")}
                    styles={"rounded-full w-full bg-gray-100"}
                />
            </div>
            <div className='flex justify-between px-10 lg:px-20'>
                <label className='' htmlFor='uploadvideo' >
                    {/* <input type='file' className='hidden' id="uploadvideo" data-max-size='5120' accept='.mp4, .wav'
                        onChange={handleUploadVideo} /> */}
                    <IoVideocamOutline size={22} color='black' className='cursor-pointer' />
                </label>
                <label className='' htmlFor='uploadimage' >
                    <input type='file' className='hidden' id="uploadimage" data-max-size='5120' accept='.jpg, .png, .jpeg'
                        onChange={handleUploadImage} />
                    <CiImageOn size={22} color='black' className='cursor-pointer' />
                </label>
                <label className='' htmlFor='uploadgif' >
                    {/* <input type='file' className='hidden' id="uploadgif" data-max-size='5120' accept='.gif'
                        onChange={handleUploadGif} /> */}
                    <MdGifBox size={22} color='black' className='cursor-pointer' />
                </label>
            </div >
            {image && <img src={image.preview} className='rounded-xl' alt="404" />}
            {/* {video && <video src={video.preview} className='rounded-xl' autoPlay muted />}
            {gif && <img src={gif.preview} className='rounded-xl' alt='404' />} */}
            <div className='flex' style={{ justifyContent: `${image ? "space-between" : "end"}` }}>
                {image && <div className='flex text-white'>
                    <CustomBtn type={"button"} label={"Cancel"} styles={"text-red-600 border px-1 rounded-lg hover:bg-red-100 border-red-600"} onClick={handleCancelPost} />
                </div>}
                <div className='flex text-white'>
                    <CustomBtn type={"submit"} label={"Post"} styles={"border border-blue-600 px-1 py-0 rounded-lg bg-blue-600 hover:bg-blue-500"} />
                </div>
            </div>
        </form >
    )
}

export default CreatePost