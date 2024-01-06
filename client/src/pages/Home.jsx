import React, { useState } from 'react'
import { TopBar } from '../components'
import HomeTab from '../components/home/HomeTab'
import FriendTab from '../components/home/FriendTab'
import NotificationTab from '../components/home/NotificationTab'


const Home = () => {
    const [tab, setTab] = useState("home");
    return (
        <div className='w-full px-0 pb-10 lg:px-10 lg:pb-20 2xl:px-40 lg:rounded-lg h-screen overflow-hidden'>

            <TopBar setTab={setTab} tab={tab} />
            {
                tab === "home" ? <HomeTab /> : (tab === "friend" ? <FriendTab /> : <NotificationTab />)
            }
        </div>
    )
}

export default Home