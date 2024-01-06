import React from 'react'
import { TbSocial } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { CustomBtn, TextInput } from '../components';
import { logo } from '../assets';
import { Link, Navigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const Register = () => {
    const token = JSON.parse(window.localStorage.getItem("user"))?.token;
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm(({
        mode: "onChange"
    }))
    const onSubmit = async (data) => {
        const { confirmpassword, ...newData } = data;
        console.log(data);
        try {

            const res = await apiRequest({
                url: "/auth/register",
                data: newData,
                method: "POST",
            })

            if (res.status === 200) {

                alert("Sign Up successfull. Please check your email to complete verify");


            } else {
                alert(res.data);
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        token ? <Navigate to="/" replace /> :
            <div className={`w-full h-[100vh] flex items-center justify-center p-6`}>
                {/* <div className='fixed top-4 right-4 w-[50%] lg:w-[30%]'>
                    <CustomAlert openStatus={true} />
                </div> */}
                <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex rounded-xl overflow-hidden shadow-xl'>
                    {/* LEFT */}
                    <div className={`hidden lg:flex flex-col justify-center items-center w-1/2 bg-[#1e1979]`}>
                        <img src={logo} alt="404" className='w-48 rounded-full'
                        />
                    </div>
                    {/* RIGHT */}
                    <div className={`w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center bg-[#25293c] rounded-xl lg:rounded-none`}>
                        <div className='flex gap-2 items-center mb-6'>
                            <div className='p-2 text-white rounded bg-blue-600'>
                                <TbSocial />
                            </div>
                            <span className='text-3xl font-semibold'>{process.env.REACT_APP_APP_NAME}</span>
                        </div>
                        <p className='text-ascent-1 font-semibold text-base'>Create your account</p>
                        <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-2 flex-col sm:flex-row'>
                                <TextInput
                                    type={"text"}
                                    name={"firstName"}
                                    label={"First Name"}
                                    placeholder={'Enter your first name'}
                                    register={register("firstName", {
                                        required: "First name is required",
                                    })}
                                    styles={'w-full rounded-xl'}
                                    errors={errors.firstname ? errors.firstname?.message : ""}
                                />
                                <TextInput
                                    type={"text"}
                                    name={"lastName"}
                                    label={"Last Name"}
                                    placeholder={'Enter your last name'}
                                    register={register("lastName", {
                                        required: "Last name is required",
                                    })}
                                    styles={'w-full rounded-xl'}
                                    errors={errors.lastname ? errors.lastname?.message : ""}
                                />
                            </div>
                            <TextInput
                                type={"email"}
                                name={"email"}
                                label={"Email"}
                                placeholder={'example: emlia@gmail.com'}
                                register={register("email", {
                                    required: "Email is required",
                                })}
                                styles={'w-full rounded-xl'}
                                errors={errors.email ? errors.email?.message : ""}
                            />
                            <div className='flex gap-2 flex-col sm:flex-row'>
                                <TextInput
                                    type={"password"}
                                    name={"password"}
                                    label={"Password"}
                                    placeholder={'Enter your password'}
                                    register={register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: `At leat 8 character` },
                                    })}
                                    styles={'w-full rounded-xl'}
                                    errors={errors.password ? errors.password?.message : ""}
                                />
                                <TextInput
                                    type={"password"}
                                    name={"confirmpassword"}
                                    label={"Confim Password"}
                                    placeholder={'Enter your password'}
                                    register={register("confirmpassword", {
                                        required: "Confirm Password is required",
                                        validate: (value, formValues) => value === formValues.password || "Passwords do not match"
                                    })}
                                    styles={'w-full rounded-xl'}
                                    errors={errors.confirmpassword ? errors.confirmpassword?.message : ""}
                                />

                            </div>

                            <CustomBtn type={"submit"} label={'Register'} styles={
                                'inline-flex justify-center rounded-md bg-[#1d67a8] px-8 py-3 text-sm font-medium text-white outline-none mt-2 lg:mt-6'
                            } />
                        </form>
                        <span className='text-center'>Have an account already? <Link className='text-blue-600' to={"/login"}>Login</Link></span>
                    </div>
                </div>
            </div>

    )
}

export default Register