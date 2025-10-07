import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { RiStockLine } from "react-icons/ri";
import { CiStopwatch } from "react-icons/ci";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { SlWallet } from "react-icons/sl";
import { GiCalculator } from "react-icons/gi";
import { GiGamepad } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import ConfirmationModal from "../common/ConfirmationModal";
import { VscSignOut } from "react-icons/vsc";

import toast from "react-hot-toast";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setToken(null));
        dispatch(setUser(null));

        localStorage.clear();
        toast.success("Logged Out");
        navigate("/login");
    };
    const [confirmationModal, setConfirmationModal] = useState(null);
    return (
        <div className="flex flex-col bg-white relative w-[60px] min-h-screen h-auto justify-between items-center border-grey border-r-2 md:py-4">
            <div className="flex flex-col justify-evenly flex-grow max-h-56 ">
                <div className="flex flex-col justify-between flex-grow gap-6">
                    <div className="flex flex-col gap-6">
                        <div
                            className={`${
                                location.pathname === "/dashboard/profile"
                                    ? "text-blue"
                                    : "text-grey"
                            } text-3xl cursor-pointer transition-colors duration-300 hover:text-theme`}
                            onClick={() => {
                                navigate("/dashboard/profile");
                            }}
                        >
                            <MdDashboard />
                        </div>

                        <div
                            className={`${
                                location.pathname === "/dashboard/tradeCenter"
                                    ? "text-blue"
                                    : "text-grey"
                            } text-3xl cursor-pointer transition-colors duration-300 hover:text-theme`}
                            onClick={() => {
                                navigate("/dashboard/tradeCenter");
                            }}
                        >
                            <FaHandHoldingDollar />
                        </div>
                        <div
                            className={`${
                                location.pathname === "/dashboard/portfolio"
                                    ? "text-blue"
                                    : "text-grey"
                            } text-3xl cursor-pointer transition-colors duration-300 hover:text-theme`}
                            onClick={() => {
                                navigate("/dashboard/portfolio");
                            }}
                        >
                            <RiStockLine />
                        </div>

                        <div
                            className={`${
                                location.pathname === "/dashboard/watchlist"
                                    ? "text-blue"
                                    : "text-grey"
                            } text-3xl cursor-pointer transition-colors duration-300 hover:text-theme`}
                            onClick={() => {
                                navigate("/dashboard/watchlist");
                            }}
                        >
                            <CiStopwatch />
                        </div>

                        <div
                            className={`${
                                location.pathname === "/dashboard/gamingHub"
                                    ? "text-blue"
                                    : "text-grey"
                            } text-3xl cursor-pointer transition-colors duration-300 hover:text-theme`}
                            onClick={() => {
                                navigate("/dashboard/gamingHub");
                            }}
                        >
                            <GiGamepad />
                        </div>
                        <div
                            className={`${
                                location.pathname ===
                                "/dashboard/investmentCalculator"
                                    ? "text-blue"
                                    : "text-grey"
                            } text-3xl cursor-pointer transition-colors duration-300 hover:text-theme`}
                            onClick={() => {
                                navigate("/dashboard/investmentCalculator");
                            }}
                        >
                            <GiCalculator />
                        </div>

                        <div
                            className={`${
                                location.pathname === "/dashboard/setting"
                                    ? "text-blue"
                                    : "text-grey"
                            } text-3xl cursor-pointer transition-colors duration-300 hover:text-theme`}
                            onClick={() => {
                                navigate("/dashboard/setting");
                            }}
                        >
                            <MdOutlineSettings />
                        </div>
                        <div
                            className="text-grey text-3xl cursor-pointer transition-colors duration-200 hover:text-theme"
                            onClick={() => {
                                setConfirmationModal({
                                    text1: "Are you sure?",
                                    text2: "You will be logged out!",
                                    btnText1: "Logout",
                                    btnHandler1: () => {
                                        logout();
                                    },
                                    btnText2: "Cancel",
                                    btnHandler2: () => {
                                        setConfirmationModal(null);
                                    },
                                });
                            }}
                        >
                            <VscSignOut className="" />
                        </div>
                    </div>
                </div>
            </div>

            {confirmationModal ? (
                <ConfirmationModal confirmationModal={confirmationModal} />
            ) : null}
        </div>
    );
};

export default Sidebar;
