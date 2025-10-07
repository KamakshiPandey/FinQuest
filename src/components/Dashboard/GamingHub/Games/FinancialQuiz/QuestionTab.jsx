import React, { useState } from "react";
import toast from "react-hot-toast";

const QuestionTab = ({
    question,
    correctAnswer,
    explanation,
    options,
    showExplanation,
    setShowExplanation,
    optionsTouched,
    setOptionsTouched,
}) => {
    const HandleClick = (touched) => {
        if (showExplanation) return;
        const index = touched.charCodeAt(0) - "A".charCodeAt(0); // Convert option letter to array index
        const newOptionsTouched = [...optionsTouched];

        // If the touched option matches the correct answer, change the color to green and show explanation
        if (touched === correctAnswer) {
            setShowExplanation(true);
            toast.success("Correct 😍");
        } else {
            toast.error("Try Again 🔍");
        }

        // Set the touched state of the clicked option in the array
        newOptionsTouched[index] = true;
        setOptionsTouched(newOptionsTouched);
    };

    return (
        <div>
            <div className="mb-10">
                {/* Question */}
                <span className="font-semibold text-sm"> Question : </span>{" "}
                <span className="text-lg italic font-semibold">{question}</span>
            </div>
            <div>
                {options.map((option, index) => {
                    return (
                        <div
                            key={index}
                            className={`${optionsTouched[index]
                                    ? `${option.option === correctAnswer
                                        ? "bg-[#00ff00]"
                                        : "bg-[#ff0000]"
                                    }`
                                    : ""
                                } cursor-pointer  border-settingBlack border-[1px] w-full py-2 rounded-md shadow-md px-4 my-2 hover:scale-[99%] font-semibold`}
                            onClick={() => HandleClick(option.option)}
                        >
                            {option.option}
                            {". "} {option.text}
                        </div>
                    );
                })}
            </div>
            {showExplanation && (
                <div className="font-semibold rounded-md p-2 border-settingBlack border-[1px] ">
                    {
                        <div>
                            {"Explanation :"}
                            {explanation}
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default QuestionTab;
