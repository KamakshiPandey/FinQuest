import React from 'react';
import { useSelector } from 'react-redux';
import PortfolioListPagination from './PortfolioListPagination';

const PortfolioList = () => {
    return (
        <div className="my-4">
            <div className='grid grid-cols-8 gap-2 bg-blue-500 text-black font-bold p-2 rounded'>
                <div className="col-span-1 text-center">Stock Name</div>
                <div className="col-span-1 text-center">Current Price</div>
                <div className="col-span-1 text-center">Avg. Buying Price</div>
                <div className="col-span-1 text-center">Quantity</div>
                <div className="col-span-1 text-center">Current Valuation</div>
                <div className="col-span-1 text-center">Total Investment</div>
                <div className="col-span-1 text-center">Profit/Loss</div>
                <div className="col-span-1 text-center">Operations</div>
            </div>
            <div className="bg-[#BEE3F8] rounded shadow-md">
                {/* Portfolio data goes here */}
            </div>
            <div className="mt-4">
                <PortfolioListPagination/>
            </div>
        </div>
    );
}

export default PortfolioList;
