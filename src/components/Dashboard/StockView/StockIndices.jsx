import React, { useEffect, useState } from "react";
import fetchCurrentPrice from "../../../../pyserver/MakeRequest/getStockCurrentPrice";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const StockIndices = ({ symbol }) => {
    const [stocks, setStocks] = useState([
        {
            symbol: "RELIANCE",
            companyName: "Reliance Industries Ltd.",
            price: 0,
            changePrice: 0,
            changePercent: 0,
        },
        {
            symbol: "ONGC",
            companyName: " Oil & Natural Gas Corporation",
            price: 0,
            changePrice: 0,
            changePercent: 0,
        },
        {
            symbol: "TATASTEEL",
            companyName: "Tata Steel Ltd.",
            price: 0,
            changePrice: 0,
            changePercent: 0,
        },
        {
            symbol: "SBIN",
            companyName: "State Bank Of India",
            price: 0,
            changePrice: 0,
            changePercent: 0,
        },
    ]);
    useEffect(() => {
        const findCurrValue = async () => {
            const updatedStocks = await Promise.all(
                stocks.map(async (stock) => {
                    const response = await fetchCurrentPrice(stock.symbol);
                    return {
                        ...stock,
                        price: response.lastPrice.toFixed(2),
                        changePercent: response.pChange.toFixed(2),
                        changePrice: response.change.toFixed(2),
                    };
                })
            );

            setStocks(updatedStocks);
            // Now you can update the state with the updatedStocks or perform any other actions
        };

        findCurrValue();
    }, []);

    return (
        <div className="p-8 rounded-lg bg-white  my-2 shadow-lg">
            <div className="font-semibold text-lg mb-4">People Also Watch</div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="font-light">
                        <tr className="text-left text-sm  text-settingBlack">
                            <th className="px-4 py-2 font-semibold">Name</th>
                            <th className="px-4 font-semibold py-2">Price</th>
                            <th className="px-4 font-semibold py-2">Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <tr
                                key={stock.symbol}
                                className=""
                            >
                                <td className="px-4 py-2">
                                    <div className="font-bold text-left text-sm">
                                        {stock.symbol}
                                    </div>
                                    <div className="text-xs text-settingBlack font-normal text-left">
                                        {stock.companyName}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-sm font-bold">
                                    {stock.price}
                                </td>
                                <td className="px-4 py-2 ">
                                    <div
                                        className={`font-semibold ${
                                            parseFloat(stock.changePercent) >= 0
                                                ? "text-green"
                                                : "text-red"
                                        }`}
                                    >
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                            <div>
                                                <div>{stock.changePrice}</div>
                                                <div className="text-xs">
                                                    {stock.changePercent}%
                                                </div>
                                            </div>
                                            <div>
                                                {parseFloat(stock.changePrice) >=
                                                0 ? (
                                                    <FaArrowTrendUp/>
                                                ) : (
                                                    <FaArrowTrendDown />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockIndices;
