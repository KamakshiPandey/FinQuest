import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { symbolMapping } from "../../../data/Symbol";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { stockOperationsEndpoints } from "../../../api/api";
import { setUser } from "../../slices/profileSlice";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function BuyingModal({ stockData, setbuyingmodal }) {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [tradeValue, setTradeValue] = useState(0);

    const company = symbolMapping.find(
        (stock) => stock.SYMBOL === stockData.symbol
    );
    const companyName = company ? company.COMPANY_NAME : "";

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const walletAmt = user.walletBalance;
    const maxQuantity = Math.floor(walletAmt / stockData.current_price);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const quantity = watch("quantity");

    const { BUY_STOCK_API } = stockOperationsEndpoints;

    useEffect(() => {
        if (quantity) {
            setTradeValue(stockData.current_price * quantity);
        } else {
            setTradeValue(stockData.current_price);
        }
    }, [quantity, stockData.current_price]);

    const submitHandler = async (data) => {
        try {
            const formdata = new FormData();
            formdata.append("symbol", stockData.symbol);
            formdata.append("cprice", stockData.current_price);
            formdata.append("quantity", data.quantity);
            formdata.append("token", token);
            console.log([...formdata]);

            const response = await axios.post(BUY_STOCK_API, formdata);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.toastMessage);
                console.log(response.data.data);
                dispatch(setUser(response.data.data));
                localStorage.setItem(
                    "StockVoyager_user",
                    JSON.stringify(response.data.data)
                );
                setbuyingmodal(null);
                navigate("/dashboard/portfolio");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.toastMessage
            ) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Stock Buying failed");
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-[#837843] bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[500px] rounded-lg border bg-white  p-6 ">
                <div className="flex flex-row justify-between ">
                    <h1 className="font-semibold text-xl mb-8">
                        Buy {companyName}
                    </h1>
                    <RxCross2
                        onClick={() => {
                            setbuyingmodal(null);
                        }}
                        className=" text-xl font-bold hover:scale-95 mt-1 cursor-pointer"
                    />
                </div>
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="mx-auto w-11/12 rounded-lg border-settingBlack border-[1px] p-3 flex flex-col gap-2"
                >
                    <div className="flex flex-row justify-between w-full items-center">
                        <label
                            htmlFor="currentPrice"
                            className="text-sm font-semibold"
                        >
                            Current Price
                        </label>
                        <input
                            type="number"
                            id="currentPrice"
                            name="currentPrice"
                            className="text-right font-semibold"
                            {...register("currentPrice")}
                            value={stockData.current_price}
                            disabled
                        />
                    </div>
                    <div className="flex flex-row justify-between w-full items-center">
                        <label
                            htmlFor="quantity"
                            className="text-sm font-semibold"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="text-right font-semibold"
                            defaultValue={1}
                            min={1}
                            max={maxQuantity}
                            {...register("quantity", {
                                required: true,
                                min: 1,
                                max: maxQuantity,
                            })}
                        />
                        {errors.quantity && <span>Enter a valid quantity</span>}
                    </div>
                    <div className="flex flex-row justify-between w-full items-center">
                        <div className="text-sm font-semibold">
                            Trade Amount :
                        </div>
                        <span className="font-semibold mr-3">{tradeValue}</span>
                    </div>
                    <div className="flex flex-row justify-between w-full items-center">
                        <div className="text-sm font-semibold">Wallet :</div>
                        <span className="font-semibold mr-3">
                            {walletAmt.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex flex-row items-end justify-end mt-10">
                        <button
                            type="submit"
                            className="bg-btnBlue w-fit px-6 py-2 rounded-md hover:scale-95 font-semibold text-white cursor-pointer"
                        >
                            Confirm Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
