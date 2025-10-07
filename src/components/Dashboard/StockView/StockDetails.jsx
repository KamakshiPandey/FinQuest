import React, { useState, useEffect } from "react";
import Loader from "../../Loader.jsx";

const StockDetails = ({ symbol,stockDetails }) => {

    // Utility function to format large numbers
    const formatNumber = (num) => {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(2) + " Cr";
        } else if (num >= 100000) {
            return (num / 100000).toFixed(2) + " Lakh";
        } else {
            return num.toFixed(2);
        }
    };

    const customHeadings = {
        companyName: "Company Name",
        prevClose: "Prev. Close",
        dayRangeLow: "Day Low",
        dayRangeHigh: "Day High",
        yearRangeLow: "52 wk Low",
        yearRangeHigh: "52 wk High",
        marketCap: "Market Cap",
        averageVol: "Volume",
        industry: "Industry",
        pdSectorPe: "PD Sector PE",
        faceValue: "Face Value",
        issuedSize: "Issued Size",
    };

    return (
        <div className="rounded-lg shadow-lg p-8 bg-white mt-2">
            <h1 className="text-xl font-semibold mb-10">Stock Detail</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(stockDetails).map(([key, value]) => (
                    <div key={key} className="flex flex-row  justify-between gap-1">
                        <strong className="text-settingBlack text-xs">
                            {customHeadings[key] || key}
                        </strong>{" "}
                        <div className="font-bold text-sm text-right">
                        {typeof value === "number" && (key === "marketCap" || key === "issuedSize")
                            ? formatNumber(value)
                            : typeof value === "object"
                            ? <span className="italic">{JSON.stringify(value)}</span>
                            : <span>{value}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockDetails;
