import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImageModal, toggleUpdateUserModal } from '../../../redux/reducer/modalSlice';
import TextInput from '../TextInput';
import { useForm } from 'react-hook-form';
import CustomBtn from '../CustomBtn';
import { apiRequest } from '../../../utils/api';
import { updateUser } from '../../../redux/reducer/userSlice';
import { loadingFullScreen } from '../../../redux/reducer/loadingSlice';

export default function UpdateProfileModal() {
    const user = useSelector((state) => state.user.user);
    const open = useSelector((state) => state.modal.updateUserModal);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(toggleUpdateUserModal({
            open: false
        }))
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm(({
        mode: "onChange"
    }));

    const onSubmit = async (data) => {
        if (!(data.firstName && data.lastName)) {
            return;
        }

        try {
            dispatch(loadingFullScreen(true));

            const res = await apiRequest({
                url: "/users/update-user",
                token: user.token,
                data,
                method: "POST"
            });

            if (res.status == 200) {
                dispatch(updateUser(res.data));
            }
            setValue("firstName", "");
            setValue("lastName", "");
            setValue("location", "");
            setValue("profession", "");
            handleClose();
            dispatch(loadingFullScreen(false));

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Modal
                open={open.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='overflow-auto flex items-center justify-center'
            >
                <form className='bg-[#25293c] w-[90%] sm:w-[60%] xl:w-[40%] rounded-lg' onSubmit={handleSubmit(onSubmit)}>
                    <div className='font-bold text-xl flex pb-10 justify-end text-red-600 px-2 '
                    >
                        <div className='rounded-full p-2 cursor-pointer' onClick={handleClose}>X</div>
                    </div>
                    <div className='flex flex-col gap-10 pb-10 px-10'>
                        <TextInput
                            type={"text"}
                            name={"firsName"}
                            placeholder={"First Name"}
                            register={register("firstName", {
                                required: "First name is required",
                                value: user.user.firstName ? user.user.firstName : "",
                            })}
                            styles={"rounded-lg w-full bg-gray-300"}
                            errors={errors.firstName ? errors.firstName?.message : ""}
                        />
                        <TextInput
                            type={"text"}
                            name={"lastName"}
                            placeholder={"Last Name"}
                            register={register("lastName", {
                                required: "Last name is required",
                                value: user.user.lastName ? user.user.lastName : ""
                            })}
                            styles={"rounded-lg w-full bg-gray-300"}
                            errors={errors.lastName ? errors.lastName?.message : ""}
                        />
                        <TextInput
                            type={"text"}
                            name={"location"}
                            placeholder={"Location"}
                            register={register("location", {
                                value: user.user.location ? user.user.location : ""
                            })}
                            styles={"rounded-lg w-full bg-gray-300"}
                        />
                        <TextInput
                            type={"text"}
                            name={"profession"}
                            placeholder={"Professional"}
                            register={register("profession", {
                                value: user.user.profession ? user.user.profession : ""
                            })}
                            styles={"rounded-lg w-full bg-gray-300"}
                        />

                        <CustomBtn label={"Update"} type={"submit"} styles={"bg-blue-600 p-2 rounded-lg justify-center text-bold font-bold text-white hover:bg-blue-500"} />

                    </div>
                </form>
            </Modal>
        </div>
    );
}