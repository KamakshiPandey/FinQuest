import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { updationEndpoints } from "../../../api/api";
import { setUser } from "../../slices/profileSlice";
import { AiFillDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UpdateDP = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [chosenImage, setChosenImage] = useState(null);
    const [file, setFile] = useState(null);

    const { UPDATE_DP_API } = updationEndpoints;
    const { token } = useSelector((state) => state.auth);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            // Read the file and generate a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setChosenImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdation = async () => {
        const loadingToast = toast.loading("Updating Display Picture...");
        try {
            const formData = new FormData();
            formData.append("token", token);
            formData.append("displayPicture", file);

            const response = await axios.post(UPDATE_DP_API, formData);
            if (response.data.success) {
                toast.success(response.data.toastMessage);
                dispatch(setUser(response.data.data));
                localStorage.setItem(
                    "StockVoyager_user",
                    JSON.stringify(response.data.data)
                );
                removeHandle();
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
        toast.dismiss(loadingToast);
    };

    const removeHandle = () => {
        setFile(null);
        setChosenImage(null);
    };

    return (
        <div className="flex flex-col w-full mt-4">
            <div className="mb-5 font-semibold ">Profile Picture</div>
            <div className="flex items-start border-[1px] border-settingBlack rounded-lg p-5 relative">
                <div className="relative group">
                    <img
                        src={chosenImage ? chosenImage : user.image}
                        alt="Profile"
                        className="rounded-lg border-black border-[1px] w-28  aspect-square group-hover:opacity-75"
                    ></img>
                    {!file && (
                        <>
                            <label
                                htmlFor="uploadimage"
                                className=" p-2 text-black rounded-md text-2xl bg-bgWhite bg-opacity-40  hover:scale-95 transition-all duration-200 cursor-pointer group-hover:opacity-100 opacity-0 absolute top-6 left-6"
                            >
                                <FaPencilAlt />
                            </label>
                            <input
                                type="file"
                                id="uploadimage"
                                className="hidden"
                                onChange={handleFileInputChange}
                                accept="image/*"
                            />
                        </>
                    )}
                    {file && (
                        <button
                            onClick={removeHandle}
                            className="p-2 text-black rounded-md text-2xl bg-bgWhite bg-opacity-40  hover:scale-95 transition-all duration-200 cursor-pointer group-hover:opacity-100 opacity-0 absolute top-6 left-6"
                        >
                            <MdDelete />
                        </button>
                    )}
                </div>
                <div className="w-full">
                    <div className="ml-4">
                        <h2 className="text-xl font-semibold">
                            {user.firstName} {user.lastName}
                        </h2>
                        <div className="italic text-sm ">{user.emailID}</div>
                    </div>

                    {file && (
                        <div className="flex flex-row items-end justify-end">
                            <button
                                onClick={handleUpdation}
                                className="bg-btnBlue shadow-md text-bgWhite rounded-md py-2 px-10 w-fit transition duration-300 hover:bg-blue-600"
                            >
                                Update
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateDP;
