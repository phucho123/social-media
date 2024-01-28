import React from 'react'

const Message = ({ from, message, createdAt }) => {
    const formatTime = (createdAt) => {
        const timestamp = createdAt;
        const dateObj = new Date(timestamp);

        // Format the time
        const timeString = dateObj.toLocaleTimeString('en-US', { hour12: false });

        // Format the date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = dateObj.toLocaleDateString('en-US', options);

        return timeString + " " + dateString;
    }
    return (
        <div className={`w-full flex ${from == "user" ? "justify-end" : ""}`}>
            <div className='flex flex-col'>
                <div className='w-full flex justify-end'>
                    <div className={`text-[10px] text-blue-600`}>{formatTime(createdAt)}</div>
                </div>
                <div className={`max-w-[200px]  break-words p-2 rounded-xl ${from == "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>

                    {
                        message
                    }
                </div>
            </div>
        </div>
    )
}

export default Message