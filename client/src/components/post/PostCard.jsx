import React, { useState } from 'react'
import { avatar } from '../../assets'
import moment from 'moment/moment'
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCommentAlt } from "react-icons/fa";
import { apiRequest } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { deletePost, likePost, setComments, toggleComments, unlikePost } from '../../redux/reducer/postSlice';
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import LoadingFullScreen from '../utils/LoadingFullScreen';

const PostCard = ({ postInfo }) => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const { _id, description, imageUrl, userId, createdAt, likes, comments } = postInfo;
    const fullName = userId.firstName + " " + userId.lastName;
    const [viewMore, setViewMore] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const liked = (likes.indexOf(user.user._id) != -1)
    const [liking, setLiking] = useState(false);

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

    const openComments = async () => {
        try {
            const res = await apiRequest({
                url: `/posts/get-comments/${_id}`,
                method: "GET",
                token: user.token
            });

            if (res.status == 200) {
                dispatch(setComments(res.data));
            }
        } catch (err) {
            console.log(err);
        }
        dispatch(toggleComments({
            open: true,
            postId: _id,
        }));
    }

    const handleLikePost = async () => {
        if (liking) return;
        try {
            setLiking(true);
            const res = await apiRequest({
                url: "/posts/like",
                data: {
                    postId: _id
                },
                method: "POST",
                token: user.token
            });

            if (res.status == 200) {
                dispatch(likePost({ postId: _id, userId: user.user._id }));
            } else {
                console.log(res.data);
            }
            setLiking(false);

        } catch (err) {
            console.log(err);
            setLiking(false);
        }
    }

    const handleUnlikePost = async () => {
        if (liking) return
        try {

            setLiking(true);

            const res = await apiRequest({
                url: "/posts/unlike",
                data: {
                    postId: _id
                },
                method: "POST",
                token: user.token
            });

            if (res.status == 200) {
                dispatch(unlikePost({ postId: _id, userId: user.user._id }));

            } else {
                console.log(res.data);
            }
            setLiking(false);

        } catch (err) {
            console.log(err);
            setLiking(false);
        }
    }


    const handleDelete = async () => {
        try {
            dispatch(LoadingFullScreen(true));
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
            dispatch(LoadingFullScreen(false));

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='w-full rounded-xl bg-[#25293c] p-5 flex flex-col gap-2'>
            <div className='w-full flex justify-between'>
                <div className='flex gap-2 items-center cursor-pointer' onClick={() => {
                    navigate(`/profile/${userId._id}`);
                }}>
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

            <div className='flex justify-between mt-5 px-10 items-center'>
                <div className='flex gap-2 items-center'>
                    {
                        liked ? <AiFillLike size={30} className='cursor-pointer text-blue-600' onClick={handleUnlikePost} /> :
                            <AiOutlineLike size={30} className='cursor-pointer' onClick={handleLikePost} />
                    }
                    <span>{likes.length}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <FaRegCommentAlt size={25} className='cursor-pointer' onClick={openComments} />
                    <div>{comments.length}</div>
                </div>
                {
                    user.user._id == userId._id ? <MdDeleteOutline size={30} className='cursor-pointer text-red-600' onClick={() => showAlert()} /> : <div></div>
                }

            </div>

        </div >
    )
}

export default PostCard