import React from 'react'
import { web3 } from 'modules'

import Swap from 'components/Swap/Swap'


const HomeView: React.FC = () => {
  const context = web3.useInit()

  return (
    <div className="w-full width-container">
      <web3.Provider value={context}>
        <Swap />
      </web3.Provider>
    </div>
  )
}


export default HomeView
