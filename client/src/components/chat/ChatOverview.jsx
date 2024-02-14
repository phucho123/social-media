import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'



const ChatOverview = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='text-black flex flex-row h-[calc(100vh-60px)]'>
            <div className={`${open ? "hidden" : ""} w-full md:block md:w-[30%] border border-l-1`}>
                <ChatList setOpen={setOpen} />
            </div>
            <ChatWindow open={open} setOpen={setOpen} />
        </div>
    )
}

export default ChatOverview