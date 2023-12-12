import React, { useState } from 'react'
import { avatar } from '../../assets'
import moment from 'moment/moment'
import { AiOutlineLike } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCommentAlt } from "react-icons/fa";
import { apiRequest } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/reducer/postSlice';
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const PostCard = ({ postInfo }) => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const { _id, description, imageUrl, userId, createdAt } = postInfo;
    const fullName = userId.firstName + " " + userId.lastName;
    const [viewMore, setViewMore] = useState(false);
    const dispatch = useDispatch();

    const showAlert = () => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure to delete this post?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await handleDelete();
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        // Xử lý khi người dùng chọn "Không"
                        // console.log('Người dùng đã chọn "Không"');
                    }
                }
            ]
        });
    };


    const handleDelete = async () => {
        try {

            const res = await apiRequest({
                url: "/posts/delete",
                data: {
                    postId: _id
                },
                method: "DELETE",
                token: user.token
            })

            if (res.status == 200) {
                dispatch(deletePost(_id));
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='w-full rounded-xl bg-[#25293c] p-5 flex flex-col gap-2'>
            <div className='w-full flex justify-between'>
                <div className='flex gap-2 items-center'>
                    <img src={avatar} alt="404" className='object-cover w-14 h-14 rounded-full' />
                    <div>
                        <p className='text-lg font-semibold'>{fullName}</p>
                        <p className='text-white text-opacity-60'>{moment(createdAt).fromNow()}</p>
                    </div>
                </div>
                {/* <div className='flex items-center'>Delete</div> */}
            </div>
            {(description.length <= 300 || viewMore) ? (
                <div>
                    <span>{description}</span>
                    {
                        description.length > 300 ? <span className='text-blue-600 cursor-pointer' onClick={() => setViewMore(false)}>view less</span> : <span></span>
                    }
                </div>
            ) : (
                <div>
                    <span> {description.slice(0, 300)}</span>
                    <span className='text-blue-600 cursor-pointer' onClick={() => setViewMore(true)}>...view more</span>
                </div>
            )}
            <div className='flex justify-center'>
                {imageUrl ? <img src={imageUrl} alt="404"
                    className='max-w-full min-w-full rounded-lg'
                /> : <div></div>}
            </div>

            <div className='flex justify-between mt-5 px-10'>
                <AiOutlineLike size={22} className='cursor-pointer' />
                <FaRegCommentAlt size={22} className='cursor-pointer' />
                {
                    user.user._id == userId._id ? <MdDeleteOutline size={22} className='cursor-pointer text-red-600' onClick={() => showAlert()} /> : <div></div>
                }

            </div>

        </div >
    )
}

export default PostCard