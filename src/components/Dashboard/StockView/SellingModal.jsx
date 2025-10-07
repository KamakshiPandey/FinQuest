import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { symbolMapping } from "../../../data/Symbol";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { stockOperationsEndpoints } from "../../../api/api";
import { setUser } from "../../slices/profileSlice";

export default function SellingModal({ stockData, setSellingModal }) {
    console.log(stockData);
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [tradeValue, setTradeValue] = useState(0);
    const [profit_loss, setProfitLoss] = useState(0);

    const company = symbolMapping.find(
        (stock) => stock.SYMBOL === stockData.symbol
    );
    const companyName = company ? company.COMPANY_NAME : "";

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const walletAmt = user.walletBalance;
    const maxQuantity = stockData.quantity;
    const dispatch=useDispatch();

    const quantity = watch("quantity");

    const { SELL_STOCK_API } = stockOperationsEndpoints;

    useEffect(() => {
        if (quantity) {
            setTradeValue(stockData.current_price.lastPrice * quantity);
            setProfitLoss((stockData.current_price.lastPrice-stockData.avg_buy_price)*quantity)
        } else {
            setTradeValue(0);
            setProfitLoss(0);
        }
    }, [quantity, stockData.current_price]);

    const submitHandler = async(data) => {
        try {
            console.log('muje bulaya ')
            const formdata = new FormData();
            formdata.append("symbol", stockData.symbol);
            formdata.append("cprice", Number(stockData.current_price.lastPrice));
            formdata.append("quantity", Number(data.quantity));
            formdata.append("token", token);
            console.log([...formdata]);

            const response=await axios.post(SELL_STOCK_API,formdata);
            console.log(response);
            if(response.data.success){
                toast.success(response.data.toastMessage);
                console.log(response.data.data);
                dispatch(setUser(response.data.data))
                localStorage.setItem('StockVoyager_user', JSON.stringify(response.data.data));
                setSellingModal(null);
            }    
        } catch (error) {
            if (error.response && error.response.data && error.response.data.toastMessage) {
                toast.error(error.response.data.toastMessage);
			} else {
                toast.error("Stock selling failed");
			}
		}
    };

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border  p-6">
                <h1>SELL {companyName}</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div>
                        <label htmlFor="currentPrice">Current Price</label>
                        <input
                            type="number"
                            id="currentPrice"
                            name="currentPrice"
                            {...register("currentPrice")}
                            value={stockData.current_price.lastPrice}
                            disabled
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="currentPrice">Average Buy Price</label>
                        <input
                            type="number"
                            id="avgBuyPrice"
                            name="avgBuyPrice"
                            {...register("avgBuyPrice")}
                            value={stockData.avg_buy_price}
                            disabled
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
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
                    <div>Out of {stockData.holding} shares</div>
                    <div>
                        <div>
                            Trade Amount : <span>{tradeValue}</span>
                        </div>
                    </div>

                    <div>
                        <div>Profit/Loss : <span>{profit_loss}</span></div>
                    </div>
                    <div>
                        <div>
                            Wallet : <span>{walletAmt}</span>
                        </div>
                    </div>


                    <button
                        onClick={() => {
                            setSellingModal(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button type="submit">Confirm Order</button>
                </form>
            </div>
        </div>
    );
}
