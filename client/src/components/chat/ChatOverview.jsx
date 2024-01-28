import React, { useEffect } from 'react'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'


const ChatOverview = () => {
    return (
        <div className='text-black flex flex-row h-[calc(100vh-60px)]'>
            <div className='w-[30%] border border-l-1'>
                <ChatList />
            </div>
            <ChatWindow />
        </div>
    )
}

export default ChatOverview