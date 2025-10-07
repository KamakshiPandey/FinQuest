import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authenticationEndpoints } from "../../api/api";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { MdEmail, MdOutlinePerson } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import signUpimg from "../../assets/authentication/signupImage.jpg";

function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        if (user) {
            navigate("/dashboard/profile");
        }
    }, []);

    const { SENDOTP_API } = authenticationEndpoints;

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            const response = await axios.post(SENDOTP_API, formData);
            console.log(response);
            if (response.data.success) {
                //mtlb otp bhjdia hai
                toast.success(response.data.toastMessage);
                dispatch(setSignupData(data));
                navigate("/verifyotp");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.toastMessage
            ) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Technical Error");
            }
        }
    };

    return (
        <>
            <div className="md:w-full md:h-screen flex justify-center items-center bg-bgWhite">
                <div className="w-7/12 mx-auto bg-white rounded-lg shadow-lg flex flex-row justify-between py-12 pl-20 pr-14">
                    {/* Left Side */}
                    <div className="flex items-start  justify-center  w-1/2 h-full flex-col pr-4 ">
                        <h1 className="text-3xl font-bold mb-1 w-full text-left mx-3">
                            Sign up
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col w-full h-fit py-1 px-2 rounded-xl my-5 mx-2 gap-10 "
                        >
                            <div className="flex flex-col gap-3 w-full">
                                <div className="w-full h-full flex flex-col gap-3">
                                    {/* First Name */}
                                    <div className="flex flex-row gap-4 border-b-[2px] border-black items-center p-[1px] pb-0 ">
                                        <div className="flex flex-row items-center mt-1">
                                            <IoPerson />
                                        </div>
                                        <div className="">
                                            <input
                                                type="text"
                                                placeholder="Your First Name"
                                                className="w-full h-10 outline-none  placeholder:text-xs "
                                                id="first"
                                                {...register("firstName", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="-mt-2">
                                        {errors.firstName && (
                                            <p className="text-[#cc0000] text-xs">
                                                First name is required.
                                            </p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div className="flex flex-row gap-4 border-b-[2px] border-black items-center p-[1px] pb-0 ">
                                        <div className="flex flex-row items-center mt-1">
                                            <MdOutlinePerson />
                                        </div>
                                        <div className="">
                                            <input
                                                type="text"
                                                placeholder="Enter last name"
                                                className="w-full outline-none h-10  placeholder:text-xs"
                                                id="last"
                                                {...register("lastName", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="-mt-2">
                                        {errors.lastName && (
                                            <p className="text-[#cc0000] text-xs">
                                                Last name is required.
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-row gap-4 border-b-[2px] border-black items-center p-[1px] pb-0 ">
                                        <div className="flex flex-row items-center mt-1">
                                            <MdEmail />
                                        </div>
                                        <div className="">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="w-full outline-none h-10  placeholder:text-xs"
                                                id="email"
                                                {...register("email", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="-mt-2">
                                        {errors.email && (
                                            <p className="text-[#cc0000] text-xs">
                                                Email is required.
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-row gap-4 border-b-[2px] border-black items-center p-[1px] pb-0 ">
                                        <div className="flex flex-row items-center mt-1">
                                            <RiLockPasswordFill />
                                        </div>
                                        <div className="">
                                            <input
                                                type="password"
                                                placeholder="Enter password"
                                                className="w-full outline-none h-10  placeholder:text-xs"
                                                id="password"
                                                {...register("password", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="-mt-2">
                                        {errors.password && (
                                            <p className="text-[#cc0000] text-xs">
                                                Password is required.
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-row gap-4 border-b-[2px] border-black items-center p-[1px] pb-0 ">
                                        <div className="flex flex-row items-center mt-1">
                                            <RiLockPasswordLine />
                                        </div>
                                        <div className="">
                                            <input
                                                type="password"
                                                placeholder="Confirm password"
                                                className="w-full outline-none h-10  placeholder:text-xs"
                                                id="confirm-pass"
                                                {...register(
                                                    "confirmPassword",
                                                    {
                                                        required: true,
                                                    }
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="-mt-2">
                                        {errors.confirmPassword && (
                                            <p className="text-[#cc0000] text-xs">
                                                Confirm Password is required.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-btnBlue px-6 py-2 rounded-md hover:scale-95 transition-all duration-200 opacity-85 w-fit font-semibold"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                    <div className="w-1/2 flex justify-center items-center bg-transaparent pl-8">
                        <div className="w-full flex flex-col gap-8">
                            <img
                                src={signUpimg}
                                alt="signup-img"
                                className="md:h-full md:w-full"
                            />
                            <div className="hover:underline font-semibold flex flex-row justify-center items-center text-sm hover:scale-95">
                                <Link to="/login">I am already a User</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
