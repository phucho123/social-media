import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { avatar } from '../../assets'
import TextInput from '../utils/TextInput'
import { useForm } from 'react-hook-form'
import CustomBtn from '../utils/CustomBtn'
import SendIcon from '@mui/icons-material/Send';
import Message from './Message'
import { socket } from '../../utils'
import { addMessage, setMessages } from '../../redux/reducer/messageSlice'
import { apiRequest } from '../../utils/api'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatWindow = ({ open, setOpen }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm(({
        mode: "onChange"
    }))
    const { id } = useParams()
    const user_and_token = useSelector(state => state.user.user);
    const user = user_and_token.user;
    const token = user_and_token.token;
    const dispatch = useDispatch();
    const chatHeaderInfo = useRef(null);
    // if (id != "null") {
    //     chatHeaderInfo = user.friends.filter((friend) => friend._id == id)[0];
    // }

    const messages = useSelector((state) => state.message.messages);
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        if (id == 'null') return;
        chatHeaderInfo.current = user.friends.filter((friend) => friend._id == id)[0];
        const fetchMessages = async () => {
            try {
                const res = await apiRequest({
                    url: `/chat/get/${chatHeaderInfo.current._id}`,
                    method: "GET",
                    token
                });

                if (res.status == 200) {
                    dispatch(setMessages(res.data))
                } else {
                    console.log("You can't get messages");
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchMessages();
    }, [id])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.connect();
        socket.on(`to ${user._id}`, function (data) {
            receiveMessage(data);
        })
        return () => {
            socket.off(`to ${user._id}`)
            socket.disconnect();
        }
    }, []);

    const receiveMessage = (data) => {
        if (chatHeaderInfo.current && data.from == chatHeaderInfo.current._id) {
            console.log(chatHeaderInfo.current)
            dispatch(addMessage({
                from: chatHeaderInfo.current._id,
                to: user._id,
                message: data.message,
                createdAt: data.createdAt
            }));
        }
    }

    const handleSendMessage = async (data) => {
        try {
            const res = await apiRequest({
                url: "/chat/send",
                data: {
                    to: chatHeaderInfo.current._id,
                    message: data.message
                },
                method: "POST",
                token
            });

            if (res.status === 200) {
                socket.emit("send-message", {
                    from: user._id,
                    to: chatHeaderInfo.current._id,
                    message: data.message,
                    createdAt: res.data.createdAt
                });
                dispatch(addMessage({
                    from: user._id,
                    to: chatHeaderInfo.current._id,
                    message: data.message,
                    createdAt: res.data.createdAt
                }));
                setValue("message", null);
            } else {
                console.log("You can't send message")
            }
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className={`${open ? "" : "hidden"} md:block w-full`}>
            {
                id != "null" &&
                <div className='w-full flex-col h-full relative border'>
                    <div className='bg-white shadow-md'>
                        <div className={`flex w-full items-center gap-2 justify-start py-2 cursor-pointer`}>
                            <div className='flex items-center gap-2 ml-2'>
                                <div className='flex items-center justify-center lg:hidden' onClick={() => setOpen(false)}>
                                    <ArrowBackIcon style={{ marginRight: 10 }} />
                                </div>
                                <img src={chatHeaderInfo.current?.profileUrl ? chatHeaderInfo.current?.profileUrl : avatar} alt="404" className='object-cover aspect-square w-14 rounded-full flex' />
                                <p className='text-lg font-semibold'>{chatHeaderInfo.current?.firstName + " " + chatHeaderInfo.current?.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full gap-4 flex flex-col overflow-y-auto h-[calc(100%-120px-1rem)] py-2 px-4'>
                        {
                            messages.length > 0 && messages.map((message, index) => (
                                <Message from={message.from == user._id ? "user" : "friend"} message={message.message} key={index} createdAt={message.createdAt} />
                            ))
                        }
                        <div ref={messagesEndRef}></div>
                    </div>
                    <form className='flex px-4 py-2 absolute bottom-0 bg-white w-full' onSubmit={handleSubmit(handleSendMessage)}>
                        <TextInput
                            type={"text"}
                            name={"message"}
                            placeholder={"Enter your message"}
                            register={register("message")}
                            styles={"rounded-l-full w-full bg-gray-100 h-12"}
                        />
                        <CustomBtn label={<SendIcon />} type={"submit"} styles={'bg-blue-600 h-12 px-2 rounded-r-full'} />
                    </form>
                </div>
            }
        </div>
    )
}

export default ChatWindow