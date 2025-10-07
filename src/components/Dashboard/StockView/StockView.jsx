import React, { useState } from "react";
import { useParams } from "react-router-dom";
import StockTitle from "./StockTitle";
import StockGraph from "./StockGraph";
import StockDetails from "./StockDetails";
import StockIndices from "./StockIndices";
import Loader from "../../Loader";
import fetchStockDetails from "../../../../pyserver/MakeRequest/getStockDetails.js";
import fetchCurrentPrice from "../../../../pyserver/MakeRequest/getStockCurrentPrice";
import { useEffect } from "react";

const StockView = () => {
    const { symbol } = useParams();
    const [stockPrice, setStockPrice] = useState(null);
    const [loadingPrice, setLoadingPrice] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [stockDetails, setStockDetails] = useState(null);

    const fetchPrice = async () => {
        setLoadingPrice(true);
        const response = await fetchCurrentPrice(symbol);

        setStockPrice(response.lastPrice);
        setLoadingPrice(false);
    };
    const preprocessData = (data) => {
        if (data.dayRange) {
            const dayRange = data.dayRange;
            data.dayRangeLow = dayRange.low;
            data.dayRangeHigh = dayRange.high;
            delete data.dayRange;
        }

        if (data.yearRange) {
            const yearRange = data.yearRange;
            data.yearRangeLow = yearRange.low;
            data.yearRangeHigh = yearRange.high;
            delete data.yearRange;
        }

        setStockDetails(data);
    };
    const fetchData = async () => {
        setLoadingDetails(true);
        try {
            const data = await fetchStockDetails(symbol);
            preprocessData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingDetails(false);
        }
    };

    useEffect(() => {
        console.log("calling the functions");
        fetchPrice();
        fetchData();
    }, []);

    return (
        <div className="w-full bg-bgWhite">
            {!loadingPrice && !loadingDetails ? (
                <div className="mx-auto w-11/12 my-10">
                    <div className="flex flex-col md:flex-row gap-6 w-full  ">
                        {/* Left Side */}
                        <div className="flex flex-col w-full md:w-[62%] items-center gap-6">
                            <div className="h-1/5 w-full">
                                <StockTitle
                                    symbol={symbol}
                                    stockPrice={stockPrice}
                                />
                            </div>
                            <div className="h-4/5 w-full">
                                <StockGraph symbol={symbol} />
                            </div>
                        </div>
                        {/* Right Side */}
                        <div className="flex flex-col w-full md:w-[38%] gap-6">
                            <div className="w-full h-1/2">
                                <StockDetails
                                    symbol={symbol}
                                    stockDetails={stockDetails}
                                />
                            </div>

                            <div className="w-full h-1/2">
                                <StockIndices symbol={symbol} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default StockView;
