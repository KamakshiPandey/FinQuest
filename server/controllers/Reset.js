const User = require("../models/User");
const { mailSender } = require("../utils/MailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//reset token
exports.resetPasswordToken = async (req, res) => {
    try {
        //extract email fromm body

        const { email } = req.body;

        //check if user exists or not
        // console.log("here is error")

        const user = await User.findOne({ emailID: email });
        if (!user) {
            return res.status(500).json({
                success: false,
                message:
                    "user is not even registred :Get registered to reset password ",
                toastMessage:
                    "Email is not registerd . Kindly head over to signup page ",
            });
        }

        //generate token
        const token = crypto.randomUUID();
        const updatedUser = await User.findOneAndUpdate(
            { emailID: email },
            {
                token: token,
                expirationTime: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        //generate url
        const url = `http://localhost:3000/update-password/${token}`;

        //send mail
        await mailSender(
            email,
            "Mail to Reset Password",
            `Use this email to reset your password : ${url}`
        );

        return res.status(200).json({
            success: true,
            message: "Reset Password link sent successfully ",
            toastMessage: "Reset Link sent to you prescribed email ",
            updatedUser,
        });
    } catch (error) {
        console.log(
            "Error occured during token generation for reset password",
            error
        );
        return res.status(500).json({
            success: false,
            message: "Error during Reset Password Token Generation ",
            toastMessage: "Technical Error !",
            error,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        //fetchign the data from body : token ko url s body m front -end dalega
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(500).json({
                success: false,
                message: "Confirm Password do not match the entered Password",
                toastMessage:
                    "Confirm Password does not matches the New Password",
            });
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User dont exist",
                toastMessage: "This reset page has been expired .",
            });
        }
        if (user.expirationTime < Date.now()) {
            return res.status(500).json({
                success: false,
                message:
                    "This Url link has been expired and now you cant update your password by this",
                toastMessage: "This reset page has been expired .",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findOneAndUpdate(
            { token },
            {
                password: hashedPassword,
                token: null,
                expirationTime: null,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password was updated Successfully",
            toastMessage: "Password Reset successfully",
        });
    } catch (error) {
        console.log("Error occured during password updation ", error);
        return res.status(500).json({
            success: false,
            message: "Error occured while updating the password",
            toastMessage: "Technical Error !",
        });
    }
};
