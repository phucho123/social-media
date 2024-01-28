import React, { useEffect, useState } from 'react'
import { TopBar } from '../components'
import HomeTab from '../components/home/HomeTab'
import FriendTab from '../components/home/FriendTab'
import NotificationTab from '../components/home/NotificationTab'
import { Outlet, useLocation } from 'react-router-dom'


const Home = () => {
    const location = useLocation();
    const [tab, setTab] = useState("home");
    useEffect(() => {
        let tabUrl = window.location.href.split("/");
        tabUrl = tabUrl[tabUrl.length - 1];
        switch (tabUrl) {
            case "friends":
                setTab("friend");
                break;
            case "notifications":
                setTab("notification");
                break;
            case "":
                setTab("home");
                break;
            default:
                setTab("");
                break;
        }
    }, [location]);

    return (
        <div className='w-full bg-[#f1f1f1] px-0 2xl:px-40 lg:rounded-lg h-screen overflow-y-hidden flex flex-col'>
            <TopBar setTab={setTab} tab={tab} />
            <Outlet />
        </div>

    )
}

export default Home