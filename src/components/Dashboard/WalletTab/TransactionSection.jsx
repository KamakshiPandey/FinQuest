import React from 'react'
import TransactionTable from './TransactionComponent/TransactionTable'

const TransactionSection = () => {
  return (
    <div>
        <div className='text-lg font-semibold mt-10 mb-4'>
            Transactions
        </div>
        {/* <div>Your Portfolio trades and transactions.</div> */}

        <TransactionTable/>
    </div>
  )
}

export default TransactionSection