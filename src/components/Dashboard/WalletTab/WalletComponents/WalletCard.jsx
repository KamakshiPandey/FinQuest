import React from "react";
import { BsSuitcaseLg } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";

function WalletCard({ icon, balance }) {
    let selectedIcon;
    switch (icon) {
        case "Portfolio Amount":
            selectedIcon = <BsSuitcaseLg />;
            break;
        case "Wallet Amount":
            selectedIcon = <CiWallet />;
            break;
        case "Credit":
            selectedIcon = <IoPricetagsOutline />;
            break;
        default:
            selectedIcon = null;
    }

    return (
        <div className={`flex flex-col gap-4 border-black border p-5 rounded-lg bg-white `}>
            <div className="flex flex-row items-center gap-4">
                <div className="text-lg text-blue font-bold">{selectedIcon}</div>
                <div className="font-semibold">{icon}</div>
            </div>
            <div className="text-lg font-bold">{balance}</div>
        </div>
    );
}

export default WalletCard;
