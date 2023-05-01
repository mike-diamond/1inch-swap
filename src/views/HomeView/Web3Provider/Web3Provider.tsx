import React from 'react'
import { web3 } from 'modules'


const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const web3Context = web3.useInit()

  return (
    <web3.Provider value={web3Context}>
      {children}
    </web3.Provider>
  )
}


export default Web3Provider
