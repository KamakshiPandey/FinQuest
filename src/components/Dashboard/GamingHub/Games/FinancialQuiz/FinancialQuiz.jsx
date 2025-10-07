import React, { useState } from "react";
import { Questionnaire } from "../../../../../data/Quiz_Questions";
import QuestionTab from "./QuestionTab";
import { GrLinkNext } from "react-icons/gr";

const FinancialQuiz = () => {
    const len = Questionnaire.length;
    const [questionNo, setQuestionNumber] = useState(
        Math.floor(Math.random() * len)
    );
    const [showExplanation, setShowExplanation] = useState(false);
    const [optionsTouched, setOptionsTouched] = useState(Array(4).fill(null));

    const changeQuestion = () => {
        let newQuestion = Math.floor(Math.random() * len);
        while (newQuestion === questionNo) {
            newQuestion = Math.floor(Math.random() * len);
        }
        setQuestionNumber(newQuestion);
        setShowExplanation(false);
        console.log(Questionnaire[questionNo]);
        setOptionsTouched(Array(4).fill(null));
    };
    return (
        <div className="bg-bgWhite w-full">
            <div className="bg-white mx-auto w-9/12 my-10 rounded-md shadow-md  p-10">
                <div>
                    <div className="flex flex-row justify-between mb-10">
                        <div className="font-semibold">Financial Quiz</div>

                        <div
                            onClick={() => {
                                changeQuestion();
                            }}
                            className="cursor-pointer text-blue-500 flex flex-row gap-2 items-center rounded-md font-semibold p-2 mr-10 hover:scale-95"
                        >
                            Next
                            <GrLinkNext />
                        </div>
                    </div>
                    <div className="w-11/12 mx-auto rounded-md border-settingBlack border-[1px] py-4 px-4">
                        <QuestionTab
                            question={Questionnaire[questionNo].question}
                            correctAnswer={
                                Questionnaire[questionNo].correctAnswer
                            }
                            explanation={Questionnaire[questionNo].explanation}
                            options={Questionnaire[questionNo].options}
                            showExplanation={showExplanation}
                            setShowExplanation={setShowExplanation}
                            optionsTouched={optionsTouched}
                            setOptionsTouched={setOptionsTouched}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialQuiz;
