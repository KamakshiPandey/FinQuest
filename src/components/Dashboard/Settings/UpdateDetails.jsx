import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updationEndpoints } from "../../../api/api";
import { setUser } from "../../slices/profileSlice";

const UpdateDetails = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues,
        setValue,
        watch,
    } = useForm();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const { UPDATE_DETAILS_API } = updationEndpoints;

    useEffect(() => {
        setValue("firstName", user.firstName || "");
        setValue("lastName", user.lastName || "");
        setValue("phoneNumber", user.additionalDetails.phoneNumber || "");
        setValue("gender", user.additionalDetails.gender || "");
        setValue("about", user.additionalDetails.about || "");
    }, [user, setValue]);

    const firstName = watch("firstName");
    const lastName = watch("lastName");
    const phoneNumber = watch("phoneNumber");
    const gender = watch("gender");
    const about = watch("about");

    const shouldCall = () => {
        const currentValues = getValues();
        return (
            currentValues.firstName !== user.firstName ||
            currentValues.lastName !== user.lastName ||
            currentValues.phoneNumber !== user.additionalDetails.phoneNumber ||
            currentValues.gender !== user.additionalDetails.gender ||
            currentValues.about !== user.additionalDetails.about
        );
    };

    const onSubmit = async (data) => {
        if (shouldCall()) {
            const loadingToast = toast.loading("Updating...");
            try {
                const formData = new FormData();
                formData.append("firstName", data.firstName || "");
                formData.append("lastName", data.lastName || "");
                formData.append("phoneNumber", data.phoneNumber || "");
                formData.append("gender", data.gender || "");
                formData.append("about", data.about || "");
                formData.append("token", token);

                const response = await axios.post(UPDATE_DETAILS_API, formData);
                if (response.data.success) {
                    toast.success(response.data.toastMessage);
                    dispatch(setUser(response.data.data));
                    localStorage.setItem(
                        "StockVoyager_user",
                        JSON.stringify(response.data.data)
                    );
                }
            } catch (error) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.toastMessage
                ) {
                    toast.error(error.response.data.toastMessage);
                } else {
                    toast.error("Updation failed");
                }
            }
            reset();
            toast.dismiss(loadingToast);
        } else {
            toast.error("The details were not changed.");
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="mb-5 mt-4 font-semibold">Update Details</h2>
            <div className="flex items-center border-[1px] border-settingBlack rounded-lg p-5 relative w-full">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 w-full"
                >
                    <div className="flex flex-col w-full">
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-semibold mb-3"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            {...register("firstName", { required: true })}
                            value={firstName}
                            onChange={(e) =>
                                setValue("firstName", e.target.value)
                            }
                            className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder:text-black"
                        />
                        {errors.firstName && (
                            <span className="text-red">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-semibold mb-3"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            {...register("lastName", { required: true })}
                            value={lastName}
                            onChange={(e) =>
                                setValue("lastName", e.target.value)
                            }
                            className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder:text-black"
                        />
                        {errors.lastName && (
                            <span className="text-red">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-semibold mb-3"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            {...register("phoneNumber", { required: true })}
                            value={phoneNumber}
                            onChange={(e) =>
                                setValue("phoneNumber", e.target.value)
                            }
                            className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder:text-black"
                        />
                        {errors.phoneNumber && (
                            <span className="text-red">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="gender"
                            className="block text-sm font-semibold mb-3"
                        >
                            Gender
                        </label>
                        <select
                            id="gender"
                            {...register("gender", { required: true })}
                            value={gender}
                            onChange={(e) => setValue("gender", e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder:text-black"
                        >
                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && (
                            <span className="text-red">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="about"
                            className="block text-sm font-semibold mb-3"
                        >
                            About
                        </label>
                        <textarea
                            id="about"
                            {...register("about")}
                            value={about}
                            onChange={(e) => setValue("about", e.target.value)}
                            rows={3}
                            className="border border-gray-300 rounded-md py-2 px-3 w-full placeholder:text-black"
                        />
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

export default UpdateDetails;
