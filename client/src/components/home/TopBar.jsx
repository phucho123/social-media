import React from 'react'
import { TbSocial } from 'react-icons/tb';
import CustomBtn from '../utils/CustomBtn';
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoHome } from "react-icons/io5";
import { MdOutlineGroup, MdGroup } from "react-icons/md";
import { useMediaQuery } from '@mui/material';
import CustomDrawer from '../utils/CustomDrawer';

const TopBar = ({ setTab, tab }) => {
    const isMd = useMediaQuery('(min-width:770px)');
    return (
        <div className='sticky top-0 flex w-full bg-[#25293c] items-center justify-between py-3 md:py-6 px-4 rounded-b-xl'>
            <Link to="/" replace>
                <div className='flex gap-2 items-center'>
                    <div className='p-2 text-white rounded bg-blue-600 mt-0'>
                        <TbSocial />
                    </div>
                    <span className='hidden md:flex text-2xl font-semibold'>{process.env.REACT_APP_APP_NAME}</span>
                </div>
            </Link>
            <div className='flex flex-1 justify-center'>
                <div className='w-full px-8 sm:w-2/3 md:px-0 md:w-1/2 lg:w-2/5 flex justify-between'>
                    {
                        tab === "home" ? (
                            <IoHome size={30} className={`cursor-pointer text-blue-600`} />
                        ) : (
                            <IoHomeOutline size={30} className={`cursor-pointer`} onClick={() => setTab("home")} />
                        )
                    }

                    {
                        tab === "friend" ? (
                            <MdGroup size={30} className={`cursor-pointer text-blue-600`} />
                        ) : (
                            <MdOutlineGroup size={30} className={`cursor-pointer `} onClick={() => setTab("friend")} />
                        )
                    }

                    {
                        tab === "notification" ? (
                            <IoMdNotifications size={30} className={`cursor-pointer text-blue-600`} />
                        ) : (
                            <IoMdNotificationsOutline size={30} className={`cursor-pointer`} onClick={() => setTab("notification")} />
                        )
                    }

                </div>
            </div>
            <div className='flex gap-4 items-center text-ascent-1 text-md md:text-x'>
                <div>
                    {
                        isMd ? (
                            <CustomBtn
                                label='Log Out'
                                styles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full hover:border-red-600 hover:text-red-600'
                                onClick={() => {
                                    window.localStorage.removeItem("user");
                                    window.location.replace("/login");
                                }}
                            />
                        ) : (
                            <CustomDrawer />
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default TopBar