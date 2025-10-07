import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const ResetSuccess = () => {
    const navigate=useNavigate();

    
    return (
        <div className="flex flex-col w-full h-screen">
            <div className="flex flex-col flex-grow justify-center items-center gap-4">
                <div className="flex flex-col text-center gap-2">
                    <h2 className="text-4xl">
                        Reset Complete!
                    </h2>
                    <p className="text-2xl">
                        All done . Your password has been successfully reset
                    </p>
                </div>

                <div>
                    <div onClick={()=>{navigate('/login')}}>
                        <button className="border-2 p-2 rounded-lg transition-colors hover:bg-grey">Return to login</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResetSuccess;
