import React from 'react'

import Swap from './Swap/Swap'
import Web3Provider from './Web3Provider/Web3Provider'
import SwapProvider from './SwapProvider/SwapProvider'


const HomeView: React.FC = () => (
  <div className="w-full width-container">
    <Web3Provider>
      <SwapProvider>
        <Swap />
      </SwapProvider>
    </Web3Provider>
  </div>
)


export default HomeView
