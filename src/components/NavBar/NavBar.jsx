import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo/StockVoyageNavbar.jpg";
import { setSearchQuery } from "../slices/profileSlice";

function NavBar() {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { searchQuery } = useSelector((state) => state.profile);

    return (
        <>
            <div className="flex justify-between px-3 md:px-6 py-1 md:py-2 border-b-[1px] border-b-grey gap-1">
                <div className="flex justify-between items-center  md:w-11/12 mx-auto">
                    {/* Logo */}
                    <div className="flex justify-center items-center mr-2">
                        <img src={logo} width={200} />
                    </div>
                    {/* Search Bar */}
                    <div className="w-[700px]">
                        <div className="relative mx-auto">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                type="text"
                                placeholder="Search by Company Name"
                                value={searchQuery}
                                onChange={(e) =>
                                    dispatch(setSearchQuery(e.target.value))
                                }
                                onClick={()=>{navigate('/dashboard/tradeCenter')}}
                            />
                        </div>
                    </div>

                  <div className="flex justify-center items-center md:justify-end">
                      <ul className="flex justify-end">
                          <li className="flex gap-3 items-center justify-center">
                              <NavLink to="/dashboard/profile">
                                  <img
                                      src={user.image}
                                      alt="profile"
                                      width={40}
                                      className="rounded-full border-black border-[1px]"
                                  />
                              </NavLink>
                              <div className="hidden md:inline">
                                  <div className="font-semibold">
                                      {user.firstName} {user.lastName}
                                  </div>
                                  <div className="italic text-xs">
                                      {user.emailID}
                                  </div>
                              </div>
                          </li>
                      </ul>
                  </div>
                </div>
                
            </div>
        </>
    );
}

export default NavBar;
