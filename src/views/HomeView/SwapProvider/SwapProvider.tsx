import React from 'react'

import { swapContext } from '../Swap/util'


const SwapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = swapContext.useInit()

  return (
    <swapContext.Provider value={context}>
      {children}
    </swapContext.Provider>
  )
}


export default SwapProvider
