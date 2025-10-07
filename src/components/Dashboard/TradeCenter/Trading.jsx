import React from "react";
import { symbolMapping } from "../../../data/Symbol";
import { GiTakeMyMoney } from "react-icons/gi";
import { WiLightning } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Trading = () => {
    // const [searchQuery, setSearchQuery] = useState("");
    const { searchQuery } = useSelector((state) => state.profile);
    console.log(searchQuery);

    const navigate = useNavigate();

    const printStock = (stock) => {
        console.log(stock);
        navigate(`/dashboard/stockView/${stock.SYMBOL}`);
    };

    // Filter entries based on the search query
    const filteredEntries = symbolMapping
        .filter((entry) =>
            entry.COMPANY_NAME.toLowerCase().includes(searchQuery.toLowerCase())
        ) // Take the top 10 filtered entries

    return (
        <div className="bg-bgWhite">
            <div className="w-9/12 mx-auto my-6 bg-white rounded-xl shadow-lg p-6 px-12 ">
                <h2 className="text-xl font-semibold my-6 mb-14">
                    Trade Center
                </h2>
                <div className="w-11/12 mx-auto">
                    <div>
                        
                {filteredEntries.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">
                        No stock found for the search query.
                    </p>
                ) : (
                    <ul>
                        {filteredEntries.map((entry, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    printStock(entry);
                                }}
                                className="p-2 rounded-lg border-black border-[1px] my-4 py-4 flex flex-row gap-3 items-center cursor-pointer hover:scale-95 transition-all duration-150 bg-bgWhite"
                            >
                                <GiTakeMyMoney className="text-green text-xl font-bold " />
                                <div className="italic font-bold">
                                    {entry.COMPANY_NAME}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trading;
