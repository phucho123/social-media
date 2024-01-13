import React, { useEffect, useState } from 'react'
import { avatar } from '../../assets'
import { FaRegEdit, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUpdateUserModal } from '../../redux/reducer/modalSlice';

const ProfileCard = () => {
    const user = useSelector((state) => state.user.user.user);
    const username = user.firstName + " " + user.lastName;
    const createdAt = moment(user.createdAt).fromNow();
    const dispatch = useDispatch();
    return (
        <div className='w-full bg-[#25293c] rounded-xl pd-4 flex flex-col items-center px-5 py-5'>
            <div className='w-full border-b border-white border-opacity-20 pb-5 flex flex-col gap-5 mb-5'>
                <div className='flex items-center justify-between'>
                    <Link to={`/profile/${user._id}`} className='flex items-center gap-2'>
                        <img src={user.profileUrl} alt="404" className='object-cover w-14 h-14 rounded-full' />
                        <div>
                            <p className='text-lg font-semibold'>{username.length > 15 ? username.slice(0, 15) + "..." : username}</p>
                            {/* <span className='text-sm opacity-40'>Hacker</span> */}
                        </div>
                    </Link>
                    <FaRegEdit size={22} className='text-blue-600 cursor-pointer' onClick={() => dispatch(toggleUpdateUserModal({ open: true }))} />
                </div>
                <div className='flex items-center gap-2'>
                    <IoLocationOutline style={{ color: "blue" }} size={22} />
                    <span>{user.location ? user.location : "Add Location"}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <BsBriefcase style={{ color: "blue" }} size={22} />
                    <span>{user.profession ? user.profession : "Add Profesional"}</span>
                </div>
                <div className='flex justify-between'>
                    <p>Joined</p>
                    <p className='text-white text-opacity-60'>{createdAt}</p>
                </div>
            </div>
            <div className='w-full border-b border-white border-opacity-20 pb-5 flex flex-col gap-5 mb-5'>
                <p className='font-semibold text-lg'>Social Profiles</p>
                <div className='flex gap-2 items-center'>
                    <FaFacebook size={22} />
                    <p>Facebook</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <FaInstagram size={22} />
                    <p>Instagram</p>
                </div>
                <div className='flex gap-2 items-center'    >
                    <FaTwitter size={22} />
                    <p>Twitter</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard