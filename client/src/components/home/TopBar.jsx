import React from 'react'
import { TbSocial } from 'react-icons/tb';
import CustomBtn from '../utils/CustomBtn';
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoHome } from "react-icons/io5";
import { MdOutlineGroup, MdGroup } from "react-icons/md";
import { useMediaQuery } from '@mui/material';
import CustomDrawer from '../utils/CustomDrawer';
import SearchBar from '../utils/SearchBar';

const TopBar = ({ setTab, tab }) => {
    const isMd = useMediaQuery('(min-width:1024px)'); //770
    const navigate = useNavigate();
    return (
        <div className='sticky top-0 flex w-full bg-white items-center justify-between py-2 px-4 shadow-md'>
            {/* <Link to="/" replace>
                <div className='flex gap-2 items-center'>
                    <div className='p-2 text-white rounded bg-blue-600 mt-0'>
                        <TbSocial />
                    </div>
                    <span className='hidden md:flex text-2xl font-semibold'>{process.env.REACT_APP_APP_NAME}</span>
                </div>
            </Link> */}
            <div className='flex-1 max-w-[50%] md:max-w-[40%]'>
                <SearchBar />
            </div>
            {
                isMd ?
                    <div className='flex justify-center w-[45%]'>
                        <div className='w-full sm:w-2/3 flex justify-between'>
                            <div className='px-4 py-2 hover:bg-gray-200 rounded-xl'>
                                {
                                    tab === "home" ? (
                                        <IoHome size={30} className={`cursor-pointer text-blue-600 `} />
                                    ) : (
                                        <IoHomeOutline size={30} color='black' className={`cursor-pointer`} onClick={() => {
                                            setTab("home");
                                            navigate("/");
                                        }} />
                                    )
                                }
                            </div>

                            <div className='px-4 py-2 hover:bg-gray-200 rounded-xl'>
                                {
                                    tab === "friend" ? (
                                        <MdGroup size={30} className={`cursor-pointer text-blue-600`} />
                                    ) : (
                                        <MdOutlineGroup size={30} color='black' className={`cursor-pointer `} onClick={() => {
                                            setTab("friend");
                                            navigate("friends");
                                        }} />
                                    )
                                }
                            </div>
                            <div className='px-4 py-2 hover:bg-gray-200 rounded-xl'>
                                {
                                    tab === "notification" ? (
                                        <IoMdNotifications size={30} className={`cursor-pointer text-blue-600`} />
                                    ) : (
                                        <IoMdNotificationsOutline size={30} color='black' className={`cursor-pointer`} onClick={() => {
                                            setTab("notification");
                                            navigate("notifications");
                                        }} />
                                    )
                                }
                            </div>

                        </div>
                    </div> : <div></div>
            }
            <div className='w-[30%] flex gap-4 items-center text-ascent-1 text-md md:text-x justify-end'>
                <div>
                    {
                        isMd ? (
                            <CustomBtn
                                label='Log Out'
                                styles='text-sm text-black text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full hover:border-red-600 hover:text-red-600 hover:bg-red-100'
                                onClick={() => {
                                    window.localStorage.removeItem("user");
                                    navigate("/login");
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