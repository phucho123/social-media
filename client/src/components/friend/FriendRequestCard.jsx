import React from 'react'
import { avatar } from '../../assets'
import CustomBtn from '../utils/CustomBtn'
import { apiRequest } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/reducer/userSlice'
import { Link } from 'react-router-dom'

const FriendRequestCard = ({ friendRequestInfo }) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const handleDeleteFriendRequest = async () => {
        try {
            const res = await apiRequest({
                url: "/users/delete-friend-request",
                method: "POST",
                data: {
                    to: user.user._id,
                    from: friendRequestInfo._id
                },
                token: user.token,
            });

            if (res.status == 200) {
                dispatch(updateUser(res.data));
            }

        } catch (err) {
            console.log(err);
        }
    }
    const handleAcceptFriendRequest = async () => {
        try {
            const res = await apiRequest({
                url: "/users/accept-friend-request",
                method: "POST",
                data: {
                    to: user.user._id,
                    from: friendRequestInfo._id
                },
                token: user.token,
            });
            if (res.status == 200) {
                dispatch(updateUser(res.data));
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='w-full flex justify-between flex-col gap-2 px-2'>
            <Link className='flex items-center gap-2' to={`/profile/${friendRequestInfo._id}`}>
                <img src={friendRequestInfo.profileUrl ? friendRequestInfo.profileUrl : avatar} alt="404" className='object-cover w-14 h-14 rounded-full' />
                <div>
                    <p className='text-lg font-semibold'>{friendRequestInfo.firstName + " " + friendRequestInfo.lastName}</p>
                    {/* <span className='text-sm opacity-40'>Hacker</span> */}
                </div>
            </Link>
            <div className='flex items-center gap-2 justify-between'>
                <CustomBtn styles={"rounded-xl bg-blue-600 p-1 w-1/2 flex justify-center hover:bg-blue-900"} label={"Accept"} onClick={handleAcceptFriendRequest} />
                <CustomBtn styles={"rounded-xl border p-1 w-1/2 flex justify-center hover:border-red-600 hover:text-red-600"} label={"Delete"} onClick={handleDeleteFriendRequest} />
            </div>
        </div>
    )
}

export default FriendRequestCard