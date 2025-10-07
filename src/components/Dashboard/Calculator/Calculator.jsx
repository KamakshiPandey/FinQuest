import React, { useEffect, useState } from "react";
import InvestmentGraph from "../GamingHub/Games/SpeedyMath/InvestmentGraph";
import { Link } from "react-router-dom";
import "./Calculator.css";

const calculateInvestment = (years, principal, isSIP, rpa) => {
    let ans;
    if (isSIP) {
        const n = years * 12;
        const r = rpa / 1200.0;
        ans = principal * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        ans -= principal * n;
    } else {
        const r = rpa / 100;
        ans = principal * Math.pow(1 + r, years);
        ans -= principal;
    }
    return ans;
};

function formatIndianNumber(num) {
    if (num === undefined || isNaN(num)) {
        return "Invalid number";
    }

    const numString = num.toString();
    const length = numString.length;
    let formattedNumber = "";

    let commaCount = 0; // Variable to keep track of comma insertion
    let i = length - 1;
    for (; i >= 0; i--) {
        commaCount++;
        if (commaCount == 4) {
            formattedNumber = "," + formattedNumber;
            commaCount = 0;
            break;
        }
        formattedNumber = numString[i] + formattedNumber;
    }

    for (; i >= 0; i--) {
        commaCount++;
        if (commaCount == 3) {
            formattedNumber = "," + formattedNumber;
            commaCount = 0;
        }
        formattedNumber = numString[i] + formattedNumber;
    }

    return formattedNumber;
}

const Calculator = () => {
    const [isSIP, setIsSIP] = useState(true);
    const [investment, setInvestment] = useState(1000);
    const [rate, setRate] = useState(7);
    const [time, setTime] = useState(1);
    const [invested, setInvested] = useState(12000);
    const [returns, setReturns] = useState(
        calculateInvestment(1, 1000, true, 7)
    );

    useEffect(() => {
        const investmentSlider = document.getElementById("investmentSlider");
        const rateSlider = document.getElementById("rateSlider");
        const timeSlider = document.getElementById("timeSlider");

        const updateValue = (slider, value) => {
            const percentage =
                ((value - slider.min) / (slider.max - slider.min)) * 100;
            slider.style.setProperty("--tw-value", percentage + "%");
        };

        const handleInvestment = () =>
            updateValue(investmentSlider, investmentSlider.value);

        const handleRate = () =>
            updateValue(rateSlider, rateSlider.value);

        const handleTime = () =>
            updateValue(timeSlider, timeSlider.value);

        handleInvestment();
        handleRate();
        handleTime();

        investmentSlider.addEventListener("input", handleInvestment);
        rateSlider.addEventListener("input", handleRate);
        timeSlider.addEventListener("input", handleTime);

        return () => {
            investmentSlider.removeEventListener("input", handleInvestment);
            rateSlider.removeEventListener("input", handleRate);
            timeSlider.removeEventListener("input", handleTime);
        };
    }, []);

    return (
        <div className="bg-bgWhite w-full">
            <div className="bg-white w-11/12 mx-auto rounded-lg shadow-xl m-2 p-10">
                <h1 className="font-semibold text-xl">Investment Calculator</h1>
                <div className="border-[1px] border-settingBlack rounded-lg p-10 m-4">
                    <div className="flex flex-row gap-2 ">
                        <div
                            onClick={() => {
                                setIsSIP(true);
                                setInvested(investment * 12 * time);
                                setReturns(
                                    calculateInvestment(
                                        time,
                                        investment,
                                        true,
                                        rate
                                    )
                                );
                            }}
                            className={`${isSIP ? "bg-[#305ef4] text-white" : "text-black bg-white"} font-bold  rounded-md py-1 px-3 transition-all duration-200 cursor-pointer`}
                        >
                            SIP
                        </div>
                        <div
                            onClick={() => {
                                setIsSIP(false);
                                setInvested(investment);
                                setReturns(
                                    calculateInvestment(
                                        time,
                                        investment,
                                        false,
                                        rate
                                    )
                                );
                            }}
                            className={`${isSIP===false ? "text-white bg-[#305ef4]" : "text-black bg-white"} font-bold rounded-md py-1 px-3 transition-all duration-200 cursor-pointer`}
                        >
                            Lumpsum
                        </div>
                    </div>

                    <div className="flex flex-row w-full gap-20 mt-10">
                        {/* Sliders */}
                        <div className="w-1/2">
                            {/* Investment slider */}
                            <div className="mb-4">
                                <div className="flex flex-row justify-between mb-3 items-center">
                                    <div className="font-semibold">
                                        {isSIP
                                            ? "Monthly Installment "
                                            : "Total Investment"}
                                    </div>
                                    <div className="bg-btnBlue bg-opacity-80 font-bold text-white rounded-sm px-2 py-1">
                                        ₹ {formatIndianNumber(investment)}
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min={100}
                                    max={100000}
                                    value={investment}
                                    step={100}
                                    id="investmentSlider"
                                    onChange={(e) => {
                                        setInvestment(e.target.value);
                                        setInvested(
                                            isSIP
                                                ? e.target.value * 12 * time
                                                : e.target.value
                                        );
                                        setReturns(
                                            calculateInvestment(
                                                time,
                                                e.target.value,
                                                isSIP,
                                                rate
                                            )
                                        );
                                    }}
                                />
                            </div>
                            {/* Rate slider */}
                            
                            <div className="mb-4">
                                <div  className="flex flex-row justify-between mb-3 items-center">
                                    <div className="font-semibold">
                                        Expected Rate of Interest per annum
                                    </div>
                                    <div className="bg-btnBlue bg-opacity-80 font-bold text-white rounded-sm px-2 py-1">
                                    {rate} %</div>
                                </div>
                                <input
                                    type="range"
                                    min={1}
                                    max={25}
                                    id="rateSlider"
                                    value={rate}
                                    step={0.1}
                                    onChange={(e) => {
                                        setRate(e.target.value);
                                        setReturns(
                                            calculateInvestment(
                                                time,
                                                investment,
                                                isSIP,
                                                e.target.value
                                            )
                                        );
                                    }}
                                />
                            </div>
                            {/* Time slider */}
                            <div className="mb-4">
                                <div className="flex flex-row justify-between mb-3 items-center">
                                    <div className="font-semibold">
                                        Time Period
                                    </div>
                                    <div className="bg-btnBlue bg-opacity-80 font-bold text-white rounded-sm px-2 py-1 min-w-[60px] text-right">
                                        {time} Yr
                                    </div>
                                </div>
                                <input
                                    type="range"
                                    min={1}
                                    max={20}
                                    value={time}
                                    id="timeSlider"
                                    onChange={(e) => {
                                        setTime(e.target.value);
                                        setInvested(
                                            isSIP
                                                ? investment *
                                                      12 *
                                                      e.target.value
                                                : investment
                                        );
                                        setReturns(
                                            calculateInvestment(
                                                e.target.value,
                                                investment,
                                                isSIP,
                                                rate
                                            )
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        {/* Graph */}
                        <div>
                            <InvestmentGraph
                                Investment={invested}
                                Interest={returns}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row w-full gap-20">
                        {/* Investment Stats */}
                        <div className="w-[46%] gap-3 flex flex-col">
                            <div className="flex flex-row justify-between">
                                <div>Invested Amount</div>
                                <div className="font-bold text-md">{"₹ "}{ formatIndianNumber(invested)}</div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div>Estimated Returns</div>
                                <div className="font-bold text-md">{"₹ "}{formatIndianNumber(Math.floor(returns))}
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div>Total Amount</div>
                                <div className="font-bold text-md">{"₹ "}{formatIndianNumber(
                                        Math.floor(
                                            Number(invested) + Number(returns)
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Investment Button */}
                        <div className="flex flex-row justify-end items-end w-1/2">
                        <Link
                            to="/dashboard/tradeCenter"
                            className="mt-10 mr-20 bg-btnBlue text-xs px-6 py-2 cursor-pointer shadow-md hover:scale-95 rounded-md font-semibold flex flex-row items-center justify-between text-white "
                        >
                            START INVESTING
                        </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
