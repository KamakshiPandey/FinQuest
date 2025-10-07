import React from "react";
import PortfolioGraph from "./Portfolio/PortfolioGraph";
import PieGraph from "./Portfolio/PieGraph";
import PortfolioList from "./Portfolio/PortfolioList";
import WalletCard from "./WalletTab/WalletComponents/WalletCard";
import { useSelector } from "react-redux";

const Portfolio = () => {
    const { user } = useSelector((state) => state.profile);
    return (
        <div className="bg-bgWhite w-full">
            <div className="w-11/12 mx-auto px-10 py-8 bg-white my-8 rounded-lg shadow-lg ">
                <h1 className="text-xl font-semibold text-black capitalize mb-6 ">
                    Portfolio
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-bgWhite shadow-lg rounded-lg py-6 px-10">
                        <h2 className="text-xl font-semibold text-black mb-4">
                            Portfolio Diversification
                        </h2>
                        <PieGraph />
                    </div>
                    <div className="bg-bgWhite rounded-lg shadow-lg py-4">
                        <div className="w-[90%] mx-auto">
                        <div className="font-semibold text-xl mb-5">Wallet</div>
                        <div className=" flex flex-col gap-4">
                            <div className="scale-80">
                                <WalletCard
                                    icon="Portfolio Amount"
                                    balance={user.portfolioBalance.toFixed(2)}
                                />
                            </div>
                            <div className="">
                                <WalletCard
                                    icon="Wallet Amount"
                                    balance={user.walletBalance.toFixed(2)}
                                />
                            </div>
                        </div>

                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-black mb-4">
                        Portfolio List
                    </h2>
                    <PortfolioList />
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
