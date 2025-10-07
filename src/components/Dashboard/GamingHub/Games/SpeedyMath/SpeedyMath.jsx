import React, { useEffect, useState } from "react";
import InvestmentGraph from "./InvestmentGraph";
import trialimage from "../../../../../assets/gameImages/teacher.png";
import { GrLinkNext } from "react-icons/gr";

const SpeedyMath = () => {
    const [time, setTime] = useState(null);
    const [sip, setSip] = useState(null);
    const [rate, setRate] = useState(null);
    const [lumpsum, setLumpsum] = useState(null);
    const [optionMul, setOptionMul] = useState(new Array(3).fill(null));
    const [finalValue, setFinalValue] = useState(null);
    const [answerFound, setAnswerFound] = useState(null);
    const [optionState, setOptionState] = useState(new Array(3).fill(null));
    const [investment, setInvestment] = useState(0);

    function formatIndianNumber(num) {
        if (num === undefined || isNaN(num)) {
            return "Invalid number";
        }

        const numString = num.toString();
        let length = numString.length;
        let formattedNumber = "";
        if(length<=3)   return numString;
        length--;

        formattedNumber=numString[length]+formattedNumber;
        length--;
        formattedNumber=numString[length]+formattedNumber;
        length--;
        formattedNumber=numString[length]+formattedNumber;
        length--;
        formattedNumber=","+formattedNumber;
        let counter=0;
        while(length>=0){
            if(counter==2){
                formattedNumber=","+formattedNumber;
                counter=0;
            }
            formattedNumber=numString[length]+formattedNumber;
            length--;
            counter++;
        }

        let i = 0;
        while (i < length) {
            if (length - i > 3) {
                formattedNumber += numString[i] + numString[i + 1] + ","; // Add two digits and a comma
                i += 2; // Move to the next set of two digits
            } else {
                formattedNumber += numString[i]; // Add the remaining digits
                i++;
            }
        }

        return formattedNumber;
    }

    const lumpsumOptions = [
        1000, 5000, 10000, 20000, 25000, 50000, 75000, 100000, 200000,
    ];
    const sipOptions = [
        100, 500, 1000, 2000, 2500, 3000, 4000, 5000, 7000, 10000,
    ];
    const rateOptions = [
        7, 7.5, 8, 9, 10, 10.5, 11, 12, 12.5, 13, 14, 14.5, 15, 16, 18, 20,
    ];
    const optionPercent = [
        0.05, 0.1, 0.5, 0.75, 0.8, 0.85, 0.9, 0.99, 1.04, 1.1, 1.5, 1.8, 2, 5,
        10, 100,
    ];

    const calculateInvestment = (years, principal, isSIP, rpa) => {
        if (isSIP) {
            const n = years * 12;
            const r = rpa / 1200.0;
            setInvestment(n * principal);
            const amt = principal * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            return amt;
        } else {
            setInvestment(principal);
            return principal * Math.pow(1 + rpa / 100, years);
        }
    };

    const initialise = () => {
        const timeRandom = Math.floor(Math.random() * 39 + 1);
        setTime(timeRandom);
        let principal;
        const lumpsumOrSip = Math.floor(Math.random() * 2);
        if (lumpsumOrSip === 1) {
            principal =
                lumpsumOptions[
                    Math.floor(Math.random() * lumpsumOptions.length)
                ];
            setLumpsum(principal);
        } else {
            principal =
                sipOptions[Math.floor(Math.random() * sipOptions.length)];
            setSip(principal);
        }
        const rateofInterest =
            rateOptions[Math.floor(Math.random() * rateOptions.length)];
        setRate(rateofInterest);

        let amt = calculateInvestment(
            timeRandom,
            principal,
            lumpsumOrSip !== 1,
            rateofInterest
        );
        setFinalValue(amt);
        let index = Math.floor(Math.random() * 3);

        let multiplier1 =
            optionPercent[Math.floor(Math.random() * optionPercent.length)];
        let multiplier2 = multiplier1;
        while (multiplier2 === multiplier1) {
            multiplier2 =
                optionPercent[Math.floor(Math.random() * optionPercent.length)];
        }
        let first_val_given = false;

        let updatedOptionsSet = [...optionMul];
        for (let i = 0; i < 3; i++) {
            if (i === index) updatedOptionsSet[i] = 1;
            else {
                if (first_val_given) {
                    updatedOptionsSet[i] = multiplier2;
                } else {
                    updatedOptionsSet[i] = multiplier1;
                    first_val_given = true;
                }
            }
        }
        setOptionMul(updatedOptionsSet);
    };

    const resetValue = () => {
        setLumpsum(null);
        setTime(null);
        setSip(null);
        setRate(null);
        setFinalValue(null);
        setAnswerFound(null);
        setOptionState(new Array(3).fill(null));
        setOptionMul(new Array(3).fill(null));
    };

    const handleClick = (value, index) => {
        if (answerFound) return;
        if (value === 1) {
            setAnswerFound(true);
        }

        const updatedOptions = [...optionState];
        updatedOptions[index] = true;
        setOptionState(updatedOptions);
    };

    useEffect(() => {
        initialise();
    }, []);

    const handleNext = () => {
        resetValue();
        initialise();
    };

    return (
        <div className="w-full bg-bgWhite">
            <div className="bg-white rounded-md shadow-xl mx-auto w-9/12 p-10 m-10 ">
                <div className="flex flex-row justify-between">
                    <div className="font-semibold mb-10">Speedy Math</div>
                    <div
                        onClick={handleNext}
                        className="cursor-pointer text-blue-500 flex flex-row gap-2 items-center"
                    >
                        NEXT
                        <GrLinkNext/>
                    </div>
                </div>
                <div className="rounded-md border-settingBlack border-[1px] p-2 flex flex-row justify-between pl-10 pt-4">
                    {/* left side */}
                    <div className="w-1/3 flex flex-col gap-5">
                        <div className="w-full ">
                            {sip ? (
                                <div className="flex flex-row justify-between w-full">
                                    <div className="font-semibold">SIP : </div>
                                    <div>₹ {sip}</div>
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between">
                                    <div className="font-semibold">Lumpsum Investment : </div>
                                    <div>₹ {lumpsum}</div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row justify-between">
                            <div className="font-semibold">Time : </div>
                            <div>{time} years</div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div className="font-semibold">Rate of interest : </div>
                            <div>{rate} %</div>
                        </div>

                        {/* options */}
                        <div className="flex flex-col items-center gap-4">
                            {Array.from({ length: 3 }).map((_, i) => {
                                const isCorrect = optionMul[i] === 1;
                                const isSelected = optionState[i];
                                const bgColor = isSelected
                                    ? isCorrect
                                        ? "bg-[#00ff00] w-full text-center font-semibold"
                                        : "bg-[#ff0000] w-full text-center font-semibold"
                                    : "bg-white border-black border-[1px] w-full text-center font-semibold";

                                return (
                                    <div
                                        key={i}
                                        className={`${bgColor} rounded-lg p-4 text-black shadow-lg cursor-pointer hover:scale-95`}
                                        onClick={() => handleClick(optionMul[i], i)}
                                    >
                                        {formatIndianNumber(
                                            Math.floor(
                                                optionMul[i] * finalValue
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* right side  */}
                    <div className="w-1/2 flex flex-col items-center justify-between">
                        {answerFound ? (
                            <InvestmentGraph
                                Investment={investment}
                                Interest={finalValue - investment}
                            />
                        ) : (
                            <img src={trialimage} className="w-1/2 h-[90%]" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeedyMath;
