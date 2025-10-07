import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { watchlistEndpoints } from "../../../api/api";
import axios from "axios";
import { setUser } from "../../slices/profileSlice";
import BuyingModal from "./BuyingModal";
import Loader from "../../Loader";

const StockTitle = ({ symbol,stockPrice }) => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [buyingmodal, setbuyingmodal] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const { ADD_TO_WATCHLIST_API, REMOVE_FROM_WATCHLIST_API } =
        watchlistEndpoints;

    const AddtoWatchlist = async () => {
        const loadingToast = toast.loading("Adding to watchlist....");
        try {
            const formData = new FormData();
            formData.append("symbol", symbol);
            formData.append("token", token);
            const response = await axios.post(ADD_TO_WATCHLIST_API, formData);
            console.log(response);
            if (response.data.success) {
                console.log(response.data.data);
                dispatch(setUser(response.data.data));
                localStorage.setItem(
                    "StockVoyager_user",
                    JSON.stringify(response.data.data)
                );
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
                toast.error("Adding to Watchlist failed");
            }
        }
        toast.dismiss(loadingToast);
    };

    const RemoveFromWatchlist = async () => {
        const loadingToast = toast.loading("Removing from watchlist....");
        try {
            const formData = new FormData();
            formData.append("symbol", symbol);
            formData.append("token", token);
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
            } else {
                toast.error("Technical error");
            }
        } catch (error) {
			if (error.response && error.response.data && error.response.data.toastMessage) {
				toast.error(error.response.data.toastMessage);
			} else {
                toast.error("Remove from Watchlist failed");
			}
		}
        toast.dismiss(loadingToast);
    };

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }
    return (
        <div className="flex flex-row items-center justify-between p-4  my-2 shadow-lg w-full h-full bg-white rounded-lg">
            <div>
                <div>
                    <img src="" />
                </div>
                <div>
                    <div className="font-bold">{symbol}</div>
                    <div>NSE:{symbol}</div>
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <div
                    className="p-2 bg-blue text-white rounded-md px-6 cursor-pointer"
                    onClick={() => {
                        stockPrice
                            ? setbuyingmodal({
                                  symbol: symbol,
                                  current_price: stockPrice,
                              })
                            : toast.error("Retry after some time");
                    }}
                >
                    BUY
                </div>
                {user.watchList.includes(symbol) ? (
                    <div
                        className="flex flex-row gap-2 items-center p-2 bg-blue text-white rounded-md px-4 cursor-pointer"
                        onClick={RemoveFromWatchlist}
                    >
                        <CiStar />
                        <div>Remove to WatchList</div>
                    </div>
                ) : (
                    <div
                        className="flex flex-row gap-2 items-center p-2 bg-blue text-white rounded-md px-4 cursor-pointer"
                        onClick={AddtoWatchlist}
                    >
                        <FaStar />
                        <div>Add to WatchList</div>
                    </div>
                )}
            </div>
            {buyingmodal ? (
                <BuyingModal
                    stockData={buyingmodal}
                    setbuyingmodal={setbuyingmodal}
                />
            ) : null}
        </div>
    );
};

export default StockTitle;
