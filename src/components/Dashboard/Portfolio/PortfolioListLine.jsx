import React, { useEffect, useState } from "react";
import fetchCurrentPrice from "../../../../pyserver/MakeRequest/getStockCurrentPrice";
import BuyingModal from "../StockView/BuyingModal";
import { current } from "@reduxjs/toolkit";
import SellingModal from "../StockView/SellingModal";

const PortfolioListLine = ({ stock }) => {
    const [buyingmodal, setbuyingmodal] = useState(null);
    const [sellingmodal, setsellingmodal] = useState(null);
    console.log(stock);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [profit, setProfit] = useState(0);

    const getPrice = async () => {
        const response = await fetchCurrentPrice(stock.stockSymbol);
        console.log(response);
        setCurrentPrice(response);
        const curr = response.lastPrice * stock.quantity;
        const buy = stock.buy_cost;
        setProfit(curr - buy);
    };

    useEffect(()=>{
        if(currentPrice)
        {
            setProfit((currentPrice.lastPrice * stock.quantity).toFixed(1)-stock.buy_cost.toFixed(1));
        }
    },[sellingmodal,buyingmodal])

    useEffect(() => {
        getPrice();
    }, []);

    return (
        <div className="grid grid-cols-9 gap-2 items-center bg-white p-4 mb-2 rounded shadow-md">
            <div className="col-span-1 text-center">
                <div className="text-lg font-semibold">{stock.stockSymbol}</div>
            </div>
            <div className="col-span-1 text-center">
                {currentPrice
                    ? currentPrice.lastPrice.toFixed(1)
                    : "Loading..."}
            </div>
            <div className="col-span-1 text-center">
                {(stock.buy_cost / stock.quantity).toFixed(1)}
            </div>
            <div className="col-span-1 text-center">{stock.quantity}</div>
            <div className="col-span-1 text-center">
                {currentPrice
                    ? (currentPrice.lastPrice * stock.quantity).toFixed(1)
                    : "Loading..."}
            </div>
            <div className="col-span-1 text-center">
                {stock.buy_cost.toFixed(1)}
            </div>
            <div className="col-span-1 text-center">
                {currentPrice ? profit.toFixed(1) : "Loading..."}
            </div>
            <div>
                {currentPrice && (
                    <div className="col-span-1 flex justify-end gap-2">
                        <div
                            className="text-lg text-theme cursor-pointer"
                            onClick={() => {
                                setbuyingmodal({
                                    symbol: stock.stockSymbol,
                                    current_price: currentPrice,
                                });
                            }}
                        >
                            BUY
                        </div>
                        <div className="text-lg text-theme cursor-pointer" onClick={() => {
                            setsellingmodal({
                                symbol: stock.stockSymbol,
                                current_price: currentPrice,
                                avg_buy_price: (stock.buy_cost / stock.quantity),
                                holding: stock.quantity,
                            })
                        }}>
                            SELL
                        </div>
                    </div>
                )}
            </div>
            {buyingmodal ? (
                <BuyingModal
                    stockData={buyingmodal}
                    setbuyingmodal={setbuyingmodal}
                />
            ) : null}

            {sellingmodal ? (<SellingModal stockData={sellingmodal} setSellingModal={setsellingmodal} />) : null}
        </div>
    );
};

export default PortfolioListLine;
