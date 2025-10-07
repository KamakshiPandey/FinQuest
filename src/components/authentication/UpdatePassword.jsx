import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { authenticationEndpoints } from "../../api/api";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";

function UpdatePassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { RESETPASSWORD_API } = authenticationEndpoints;
    const { token } = useParams();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const loadingToast = toast.loading("Updating Password...");
        try {
            const formData = new FormData();
            formData.append("token", token);
            formData.append("password", data.password);
            formData.append("confirmPassword", data.confirmPassword);
            const response = await axios.post(RESETPASSWORD_API, formData);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.toastMessage);
                navigate("/login");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.toastMessage
            ) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Password Updation  Failed");
            }
        }
        toast.dismiss(loadingToast);
    };
    return (
        <>
            <div className="flex items-center justify-center w-full h-screen bg-bgWhite ">
                <div className=" p-10 rounded-lg bg-white shadow-lg w-4/12">
                    <h1 className="text-xl font-semibold">Update Password</h1>
                    <div className="mx-auto w-11/12 mt-8">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
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
                                        {...register("confirmPassword", {
                                            required: true,
                                        })}
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
                            <div className="flex justify-end">
                            <button
                                type="submit"
                                className="text-white bg-btnBlue px-6 py-2 rounded-md hover:scale-95 transition-all duration-200 opacity-85 w-fit font-semibold"
                            >
                                Update Password
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdatePassword;
