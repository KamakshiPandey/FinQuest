import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { authenticationEndpoints } from "../../api/api";
import axios from "axios";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const { signupData } = useSelector((state) => state.auth);

    const { SIGNUP_API, SENDOTP_API } = authenticationEndpoints;

    const handleSubmit = async () => {
        // Handle submission of OTP
        try {
            const formData = new FormData();
            formData.append("email", signupData.email);
            formData.append("firstName", signupData.firstName);
            formData.append("lastName", signupData.lastName);
            formData.append("password", signupData.password);
            formData.append("confirmPassword", signupData.confirmPassword);
            formData.append("otp", otp);
            console.log(...formData);
            const response = await axios.post(SIGNUP_API, formData);
            if (response.data.success) {
                navigate("/login");
                toast.success(response.data.toastMessage);
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.toastMessage
            ) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Signup failed");
            }
        }
    };

    const handleResendOTP = async () => {
        try {
            const { email } = signupData; // Assuming signupData is accessible here
            const response = await axios.post(SENDOTP_API, { email });
            if (response.data.success) {
                toast.success("OTP resent successfully");
            } else {
                toast.error("Failed to resend OTP");
            }
        } catch (error) {
            console.error("Error occurred while resending OTP:", error);
            toast.error("Failed to resend OTP");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-full bg-bgWhite">
            <div className="flex flex-col bg-white rounded-lg p-5 gap-2">
                <h2 className="text-xl font-semibold">Verify Email</h2>
                <div className="mx-auto w-11/12 mt-8 pr-10">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">
                            The verification code has been sent to you. Enter
                            the code below
                        </p>
                    </div>

                    <div className="text-lg flex space-x-8 mt-5">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className="mx-1">-</span>}
                            renderInput={(props) => <input {...props} />}
                            id="otpstyle"
                            inputStyle="inputStyle"
                        />
                    </div>
                    <div>
                        <p className="text-xs mt-3">
                            Didn't receive the OTP?{" "}
                            <button onClick={handleResendOTP}>
                                <span className="font-bold  hover:text-theme">
                                    Resend OTP
                                </span>
                            </button>
                        </p>
                    </div>

                    <div className="flex justify-end my-5 ">
                        <button
                            onClick={handleSubmit}
                            className="text-white bg-btnBlue px-6 py-2 rounded-md hover:scale-95 transition-all duration-200 opacity-85 w-fit font-semibold"
                        >
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
