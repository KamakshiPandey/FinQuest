import React from "react";
import ChangePassword from "./Settings/ChangePassword";
import UpdateDP from "./Settings/UpdateDP";
import UpdateDetails from "./Settings/UpdateDetails";

const Settings = () => {
    return (
        <div className="w-full bg-bgWhite">

            <div className="mx-auto w-9/12 bg-white rounded-xl my-10 shadow-md flex flex-row justify-between p-10">
                <div className="flex flex-col gap-4 w-[48%]">
                    <UpdateDP />
                    <ChangePassword />
                </div>
                <div className="w-[48%]">
                    <UpdateDetails />
                </div>


            </div>
        </div>
    );
};

export default Settings;
