import React, { useState } from 'react'
import { TbSocial } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { CustomBtn, TextInput } from '../components';
import { logo } from '../assets';
import { Link } from 'react-router-dom';
import Loading from '../components/utils/Loading';
import { apiRequest } from '../utils/api';
import { useDispatch } from "react-redux";
import { userLogin } from '../redux/reducer/userSlice';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    const [isSubmiting, setIsSubmiting] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm(({
        mode: "onChange"
    }))
    const onSubmit = async (data) => {
        setIsSubmiting(true);
        try {
            const res = await apiRequest({
                url: "/auth/login",
                data,
                method: "POST",
            });

            setIsSubmiting(false);
            if (res.status === 200) {
                dispatch(userLogin(res.data));
            }

        } catch (err) {
            console.log(err);
            setIsSubmiting(false);
        }
    }

    return (
        token ? (<Navigate to="/" replace />) : (
            <div className={`w-full h-[100vh] flex items-center justify-center p-6`}>
                <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex rounded-xl overflow-hidden shadow-xl'>
                    {/* LEFT */}
                    <div className={`w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center bg-[#25293c] rounded-xl lg:rounded-none`}>
                        <div className='flex gap-2 items-center mb-6'>
                            <div className='p-2 text-white rounded bg-blue-600'>
                                <TbSocial />
                            </div>
                            <span className='text-3xl font-semibold'>{process.env.REACT_APP_APP_NAME}</span>
                        </div>
                        <p className='text-ascent-1 font-semibold text-base'>Login to your account</p>
                        <span className='tex-sm mt-2 mb-10 opacity-60'>Welcome back</span>
                        <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                            <TextInput
                                type={"email"}
                                name={"email"}
                                label={"Email"}
                                placeholder={'example: emlia@gmail.com'}
                                register={register("email", {
                                    required: "Email is required",
                                })}
                                styles={'w-full rounded-full'}
                                errors={errors.email ? errors.email?.message : ""}
                            />
                            <TextInput
                                type={"password"}
                                name={"password"}
                                label={"Password"}
                                placeholder={'Enter your password'}
                                register={register("password", {
                                    required: "Password is required",
                                    minLength: { value: 8, message: `At leat 8 character` },
                                })}
                                styles={'w-full rounded-full'}
                                errors={errors.password ? errors.password?.message : ""}
                            />
                            <span className='text-sm text-right text-blue-600'>Forgot your password?</span>
                            {isSubmiting ? <Loading size={8} />
                                : <CustomBtn type={"submit"} label={'Login'} styles={
                                    'inline-flex justify-center rounded-md bg-[#1d67a8] px-8 py-3 text-sm font-medium text-white outline-none mt-2 lg:mt-6'
                                } />
                            }
                        </form>
                        <span className='text-center'>Don't have an account? <Link className='text-blue-600' to={"/register"}>Create one</Link></span>
                    </div>
                    {/* RIGHT */}
                    <div className={`hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#1e1979]`}>
                        <img src={logo} alt="404" className='w-48 rounded-full'
                        />
                    </div>
                </div>
            </div>
        )
    )
}

export default Login