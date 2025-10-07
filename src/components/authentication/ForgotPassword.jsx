import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authenticationEndpoints } from "../../api/api";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaLongArrowAltLeft } from "react-icons/fa";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    const { RESETPASSTOKEN_API } = authenticationEndpoints;

    const submitHandler = async (e) => {
        e.preventDefault();
        sendMail();
    };

    const sendMail = async () => {
        // Implement resend email functionality here
        try {
            const formData = new FormData();
            formData.append("email", email);
            console.log(RESETPASSTOKEN_API);
            const loadingToast = toast.loading("Sending Mail...");
            const response = await axios.post(RESETPASSTOKEN_API, formData);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.toastMessage);
            }
            toast.dismiss(loadingToast);
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.toastMessage
            ) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Reset email sending failed");
            }
        }
        setEmailSent(true);
    };

    return (
        <div className="flex flex-col min-h-screen w-full  gap-8  bg-bgWhite">
            <div className="bg-white mx-auto w-4/12 mt-20 rounded-lg shadow-lg py-10 px-12">
                <div className="flex flex-row justify-between">
                    <h2 className=" text-xl font-semibold">
                        {!emailSent ? "Reset Your Password" : "Check Email"}
                    </h2>
                    <div className="flex justify-start items-start">
                    <Link to="/login" className="cursor-pointer p-2 rounded-md text-black text-xs flex flex-row gap-1 items-center hover:scale-95 text-left ">
                        <FaLongArrowAltLeft/> Back to login
                    </Link>
                    </div>
                </div>
                <div className="mx-auto w-11/12 mt-8">
                    <p className="text-xs">
                        {!emailSent
                            ? "Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                            : `We have sent the reset email to ${email}`}
                    </p>

                    <div>
                        {!emailSent ? (
                            <form onSubmit={submitHandler}>
    
                                <div className="flex flex-row gap-4 border-b-[2px] border-black items-center p-[1px] pb-0 mt-4 ">
                                        <div className="flex flex-row items-center mt-1">
                                            <MdEmail />
                                        </div>
                                        <div className="">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className="w-full outline-none h-10  placeholder:text-xs"
                                                id="email"
                                                required
                                                value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                                
                                            />
                                        </div>
                                        </div>
                                <div className="flex flex-row justify-end mt-8">
                                <button
                                    type="submit"
                                    className="text-white bg-btnBlue px-6 py-2 rounded-md hover:scale-95 transition-all duration-200 opacity-85 w-fit font-semibold"
                                >
                                    Reset Your Password
                                </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-row justify-end mt-4">
                                <button
                                    className="text-white bg-btnBlue px-6 py-2 rounded-md hover:scale-95 transition-all duration-200 opacity-85 w-fit font-semibold"
                                    onClick={() => {
                                        sendMail();
                                    }}
                                >
                                    Resend Email
                                </button>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
