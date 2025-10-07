import React from 'react';
import ApexChart from './Graph.jsx';

const StockGraph = ({ symbol }) => {
    console.log("Symbol received in StockGraph:", symbol);
    return (
        <div className="flex flex-col justify-center items-center w-full bg-white rounded-lg shadow-lg ">
            <div className="w-full rounded-lg overflow-hidden shadow-lg flex-grow h-full py-20 px-4">
                <ApexChart symbol={symbol} />
            </div>
        </div>
    );
};

export default StockGraph;
