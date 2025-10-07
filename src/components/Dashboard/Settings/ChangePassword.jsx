import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOff, IoEye } from "react-icons/io5";
import axios from "axios";
import { updationEndpoints } from "../../../api/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ChangePassword = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
	const { token } = useSelector((state) => state.auth);

	const { UPDATE_PASSWORD_API } = updationEndpoints;

	const onSubmit = async (data) => {
		const loadingToast = toast.loading("Updating Password...");
		try {
			const formData = new FormData();
			formData.append("newPassword", data.newPassword);
			formData.append("oldPassword", data.currentPassword);
			formData.append("confirmNewPassword", data.confirmNewPassword);
			formData.append("token", token);

			const response = await axios.post(UPDATE_PASSWORD_API, formData);
			console.log(response);
			if (response.data.success) {
				toast.success(response.data.toastMessage);
				reset();
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.toastMessage) {
				toast.error(error.response.data.toastMessage);
			} else {
				toast.error("Updation failed");
			}
		}
		toast.dismiss(loadingToast);
	};

	return (
		<div className="">
			<h2 className="mb-5 mt-2 font-semibold">Change Password</h2>
			<div className=" border-[1px] border-settingBlack rounded-lg p-5 relative">

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 mt-[6px]"
				>
					<div>
						<label htmlFor="currentPassword" className="block text-sm font-semibold mb-3">
							Current Password
						</label>
						<div className="relative group">
							<input
								type={showCurrentPassword ? "text" : "password"}
								id="currentPassword"
								{...register("currentPassword", { required: true })}
								placeholder="**********"
								className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder:text-black"
							/>
							<button
								type="button"
								onClick={() =>
									setShowCurrentPassword(!showCurrentPassword)
								}
								className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-none opacity-0 group-hover:opacity-100 transition-all duration-200"
							>
								{showCurrentPassword ? (
									<IoEyeOff className="text-gray-400" />
								) : (
									<IoEye className="text-gray-400" />
								)}
							</button>
						</div>
						{errors.currentPassword && (
							<span className="text-sm text-red-500">
								This field is required
							</span>
						)}
					</div>
					<div>
						<label htmlFor="newPassword" className="block text-sm font-semibold mb-3">
							New Password
						</label>
						<div className="relative group">
							<input
								type={showNewPassword ? "text" : "password"}
								id="newPassword"
								{...register("newPassword", { required: true })}
								placeholder="**********"
								className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder:text-black"
							/>
							<button
								type="button"
								onClick={() =>
									setShowNewPassword(!showNewPassword)
								}
								className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-none opacity-0 group-hover:opacity-100 transition-all duration-200"
							>
								{showNewPassword ? (
									<IoEyeOff className="text-gray-400" />
								) : (
									<IoEye className="text-gray-400" />
								)}
							</button>
						</div>
						{errors.newPassword && (
							<span className="text-sm text-red-500">
								This field is required
							</span>
						)}
					</div>
					<div>
						<label htmlFor="confirmNewPassword" className="block text-sm font-semibold mb-3">
							Confirm Password
						</label>
						<div className="relative group">
							<input
								type={showConfirmNewPassword ? "text" : "password"}
								id="confirmNewPassword"
								{...register("confirmNewPassword", { required: true })}
								placeholder="**********"
								className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder:text-black"
							/>
							<button
								type="button"
								onClick={() =>
									setShowConfirmNewPassword(!showConfirmNewPassword)
								}
								className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-none opacity-0 group-hover:opacity-100 transition-all duration-200"
							>
								{showConfirmNewPassword ? (
									<IoEyeOff className="text-gray-400" />
								) : (
									<IoEye className="text-gray-400" />
								)}
							</button>
						</div>
						{errors.confirmNewPassword && (
							<span className="text-sm text-red-500">
								This field is required
							</span>
						)}
					</div>
					<div className="flex flex-row items-end justify-end">
						<button
							type="submit"
							className="bg-btnBlue shadow-md text-bgWhite rounded-md py-2 px-16 w-fit transition duration-300 hover:bg-blue-600"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;
