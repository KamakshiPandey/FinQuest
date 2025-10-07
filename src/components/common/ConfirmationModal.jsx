import React from "react";

export default function ConfirmationModal({ confirmationModal }) {
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-[#837843] bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[250px] rounded-lg border bg-white p-6">
                <p className="text-2xl text-center font-semibold ">
                    {confirmationModal?.text1}
                </p>
                <p className="mt-3 mb-5 leading-6 text-center">
                    {confirmationModal?.text2}
                </p>
                <div className="flex items-center justify-between gap-x-4">
                    <button
                        className="cursor-pointer rounded-md  py-[8px] px-[20px] font-semibold bg-btnBlue text-white hover:scale-95 transition-colors duration-200"
                        onClick={confirmationModal?.btnHandler2}
                    >
                        {confirmationModal?.btnText2}
                    </button>
                    <button
                        className="cursor-pointer rounded-md  py-[8px] px-[20px] font-semibold bg-btnBlue text-white hover:scale-95 transition-colors duration-200 "
                        onClick={confirmationModal?.btnHandler1}
                    >
                        {confirmationModal?.btnText1}
                    </button>
                </div>
            </div>
        </div>
    );
}
