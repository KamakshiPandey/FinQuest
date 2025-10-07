import React, { useState, useEffect } from "react";
import fetchCurrentPrice from "../../../pyserver/MakeRequest/getStockCurrentPrice";
import { symbolMapping } from "../../data/Symbol";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { watchlistEndpoints } from "../../api/api";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../slices/profileSlice";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";

const WatchList = () => {
    const { user } = useSelector((state) => state.profile);
    const { REMOVE_FROM_WATCHLIST_API } = watchlistEndpoints;
    const dispatch = useDispatch();

    const [watchlistData, setWatchlistData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const fetchData = async () => {
        if (user.watchList.length === 0) return;
        try {
            setLoading(true);
            setError(null);

            const listToFetch = user.watchList;
            const promises = listToFetch.map(async (symbol) => {
                const data = await fetchCurrentPrice(symbol);
                const change = parseFloat(data.change).toFixed(2);
                const pChange = parseFloat(data.pChange).toFixed(2);

                const symbolData = symbolMapping.find(
                    (item) => item.SYMBOL === symbol
                );
                const companyName = symbolData ? symbolData.COMPANY_NAME : "";

                return {
                    ...data,
                    symbol: symbol,
                    companyName: companyName,
                    change: change,
                    pChange: pChange,
                };
            });
            const newData = await Promise.all(promises);

            newData.sort(
                (a, b) => parseFloat(b.pChange) - parseFloat(a.pChange)
            );

            setWatchlistData(newData);
            console.log(newData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = () => {
        fetchData();
    };

    const RemoveFromWatchlist = async (symbol) => {
        const loadingToast = toast.loading("Removing from watchlist....");
        try {
            const formData = new FormData();
            formData.append("symbol", symbol);
            formData.append("token", token);
            console.log(REMOVE_FROM_WATCHLIST_API);
            console.log(symbol);
            const response = await axios.post(
                REMOVE_FROM_WATCHLIST_API,
                formData
            );
            console.log(response);
            if (response.data.success) {
                dispatch(setUser(response.data.data));
                localStorage.setItem(
                    "StockVoyager_user",
                    JSON.stringify(response.data.data)
                );
                toast.success(response.data.toastMessage);
                const updatedWatchlist = watchlistData.filter(
                    (list) => list.symbol !== symbol
                );
                setWatchlistData(updatedWatchlist);
            } else {
                toast.error("Technical error");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.toastMessage
            ) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Remove from Watchlist failed");
            }
        }
        toast.dismiss(loadingToast);
    };

    if (loading) {
        return (
            <div className="flex w-full flex-row items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen py-8 bg-bgWhite">
            <div className="mx-auto w-8/12">
                <div className=" rounded-md bg-white shadow-md my-4 flex flex-col p-10">
                    <div className="flex flex-row justify-between mr-5">
                        <div className="text-xl font-semibold mb-4">
                            Watchlist
                        </div>
                        <div>
                            <IoMdRefresh
                                className="text-2xl font-bold hover:scale-90 cursor-pointer hover:opacity-95 text-btnBlue"
                                onClick={refreshData}
                            />
                        </div>
                    </div>
                    <div className="rounded-md border-settingBlack border-[1px] p-2  w-full m-5">
                        <table className="w-full">
                            <thead>
                                <tr className="text-gray-700 text-left font-semibold text-lg">
                                    <th className="px-4 py-2 text-center">
                                        Company
                                    </th>
                                    <th className="px-4 py-2 text-center">
                                        Value
                                    </th>
                                    <th className="px-4 py-2 text-center">
                                        Change
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {watchlistData.length > 0 ? (
                                    watchlistData
                                        .slice(0, 20)
                                        .map((item, index) => (
                                            <tr
                                                key={index}
                                                className=" my-4 py-8 text-center "
                                            >
                                                <td className="px-4 py-2 flex flex-row gap-2 items-center">
                                                    <FaStar
                                                        className="cursor-pointer text-[#ffea00] text-lg mr-5"
                                                        onClick={() => {
                                                            RemoveFromWatchlist(
                                                                item.symbol
                                                            );
                                                        }}
                                                    />
                                                    <div>
                                                        <div className="font-bold">
                                                            <div
                                                                className="cursor-pointer text-left"
                                                                onClick={() => {
                                                                    navigate(
                                                                        `/dashboard/stockView/${item.symbol}`
                                                                    );
                                                                }}
                                                            >
                                                                {item.symbol}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="text-sm cursor-pointer capitalize"
                                                            onClick={() => {
                                                                navigate(
                                                                    `/dashboard/stockView/${item.symbol}`
                                                                );
                                                            }}
                                                        >
                                                            {item.companyName}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 font-semibold">
                                                    ₹ {item.lastPrice}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div
                                                        className={`font-semibold ${
                                                            parseFloat(
                                                                item.pChange
                                                            ) >= 0
                                                                ? "text-green"
                                                                : "text-red"
                                                        }`}
                                                    >
                                                        <div className="flex flex-row gap-2 items-center justify-center">
                                                            <div>
                                                                <div>
                                                                    {
                                                                        item.change
                                                                    }
                                                                </div>
                                                                <div className="text-xs">
                                                                    {
                                                                        item.pChange
                                                                    }
                                                                    %
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {parseFloat(
                                                                    item.pChange
                                                                ) >= 0 ? (
                                                                    <FaArrowTrendUp />
                                                                ) : (
                                                                    <FaArrowTrendDown />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td>No Stock Added To Watchlist</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchList;
