import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import Axios
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { authenticationEndpoints } from "../../api/api";
import { setToken } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/profileSlice";
import toast from "react-hot-toast";
import loginImg from "../../assets/authentication/LoginImage.svg";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        if (user) {
            navigate("/dashboard/profile");
        }
    }, []);

    const dispatch = useDispatch();

    const { LOGIN_API } = authenticationEndpoints;

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("email", data.username);
            formData.append("password", data.password);

            const response = await axios.post(LOGIN_API, formData);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.toastMessage);
                dispatch(setToken(response.data.token));
                dispatch(setUser(response.data.user));
                localStorage.setItem(
                    "StockVoyager_token",
                    JSON.stringify(response.data.token)
                );
                localStorage.setItem(
                    "StockVoyager_user",
                    JSON.stringify(response.data.user)
                );
                navigate("/dashboard/profile");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.toastMessage
            ) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Login failed");
            }
        }
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-bgWhite ">
                <div className="w-7/12 mx-auto bg-white rounded-lg shadow-lg flex flex-row justify-between py-12 pl-16 pr-14 h- items-center">
                    {/* Left Side */}
                    <div className="flex items-start  justify-center  w-1/2 h-full flex-col pr-4 ">
                        <h1 className="text-3xl font-bold mb-4 w-full text-left mx-3 ">
                            Login
                        </h1>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full"
                        >
                            <div className="flex flex-col mb-10 justify-center pt-14 pb-6 px-2 gap-8">
                                <div className="flex flex-row gap-4 border-b-[2px] border-black items-center p-[1px] pb-0 ">
                                    <div className="flex flex-row items-center mt-1">
                                        <IoPerson />
                                    </div>
                                    <div className="">
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Your Registered Email"
                                            className="w-full outline-none h-10  placeholder:text-xs"
                                            {...register("username", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="-mt-6">
                                {errors.username && (
                                    <p className="text-[#cc0000] text-xs">
                                        Username is required.
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
                                            id="password"
                                            name="password"
                                            placeholder="Your Password"
                                            className="w-full outline-none h-10  placeholder:text-xs"
                                            {...register("password", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="-mt-6">
                                {errors.password && (
                                    <p className="text-[#cc0000] text-xs">
                                        Password is required.
                                    </p>
                                )}
                                </div>
                                <div>
                                    <div className="flex justify-end items-center -mt-6 font-semibold">
                                        <p className=" hover:scale-95 transition-all duration-200  text-blue text-xs">
                                            <Link to="/forgotpassword">
                                                Forgot Password ?
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-btnBlue px-6 py-2 rounded-md hover:scale-95 transition-all duration-200 opacity-85 w-fit font-semibold"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                    <div className="w-1/2 flex justify-center items-center bg-transaparent pl-8">
                        <div className="w-full flex flex-col gap-8">
                            <img src={loginImg} alt="login-img" className="" />
                            <div className="hover:underline font-semibold flex flex-row justify-center items-center text-sm hover:scale-95">
                                <Link to="/signup">Not Registered ? </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
