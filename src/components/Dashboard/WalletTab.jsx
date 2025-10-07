import React from 'react'
import WalletSection from './WalletTab/WalletSection'
import TransactionSection from './WalletTab/TransactionSection'

const WalletTab = () => {
  return (
    <div className='bg-bgWhite w-full'>
      <div className='bg-white p-10 max-w-[1280px] w-11/12 mx-auto my-6 rounded-md shadow-lg'>
        <WalletSection/>
        <TransactionSection/>
    </div>
    </div>
  )
}

export default WalletTab