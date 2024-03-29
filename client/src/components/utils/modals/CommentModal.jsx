import * as React from 'react';
import Modal from '@mui/material/Modal';
import Comment from '../../comment/Comment';
import TextInput from '../TextInput';
import CustomBtn from '../CustomBtn';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setComments, toggleComments } from '../../../redux/reducer/postSlice';
import { apiRequest } from '../../../utils/api';
import { loadingFullScreen } from '../../../redux/reducer/loadingSlice';
import Loading from '../Loading';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

export default function CommentModal() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    const from = user.user.firstName + " " + user.user.lastName;
    const open = useSelector((state) => state.post.comments.openComments);
    const comments = useSelector((state) => state.post.comments.commentList);
    const postId = useSelector((state) => state.post.comments.postId);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(toggleComments({
            open: false,
            postId: "",
        }))
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm(({
        mode: "onChange"
    }))

    const handlOnClick = async (data) => {
        if (!data.comment) return;
        dispatch(loadingFullScreen(true));
        try {
            const res = await apiRequest({
                url: "/posts/create-comment",
                data: {
                    postId,
                    comment: data.comment,
                    from
                },
                method: "POST",
                token: user.token
            })

            const newCommentList = [res.data, ...comments];
            console.log(res.data);
            dispatch(setComments(newCommentList));
            dispatch(loadingFullScreen(false));
        } catch (err) {
            console.log(err);
            dispatch(loadingFullScreen(false));
        }
        setValue("comment", null)
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='bg-white w-[95%] sm:w-[60%] xl:w-[40%] h-2/3 m-auto mt-20 rounded-lg border-none flex flex-col items-center'>
                    <div className='font-bold text-xl cursor-pointer flex w-[98%] justify-end text-red-600 pb-4'
                        onClick={handleClose}>
                        <CloseIcon className='rounded-full hover:bg-red-100' />
                    </div>
                    <div className='h-[100%] w-[95%] flex flex-col items-center gap-2 overflow-y-auto no-scrollbar'>
                        {
                            comments ? comments.map(comment => (
                                <Comment key={comment._id} commentInfo={comment} />
                            )) : <Loading />
                        }
                    </div>
                    <form className='w-full p-4 flex items-center'
                        onSubmit={handleSubmit(handlOnClick)}>
                        <TextInput
                            type={"text"}
                            name={"comment"}
                            placeholder={"Leave your comment"}
                            register={register("comment")}
                            styles={"rounded-l-full w-full bg-gray-100 h-10"}
                        />
                        <CustomBtn label={<SendIcon />} type={"submit"} styles={
                            "bg-blue-600 rounded-r-full h-10 p-2 text-white font-bold"
                        }
                        />
                    </form>
                </div>


            </Modal>
        </div>
    );
}