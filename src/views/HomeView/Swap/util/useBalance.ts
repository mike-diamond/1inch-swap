import { useEffect, useMemo, useState } from 'react'
import { erc20, web3 } from 'modules'
import { formatUnits } from '@ethersproject/units'

import * as swapContext from './context'


const useBalance = () => {
  const { address, provider } = web3.useData()
  const { fromToken, values } = swapContext.useData()

  const [ balance, setBalance ] = useState<string>('0')

  const contract = useMemo(() => {
    if (provider && fromToken?.address) {
      return erc20(fromToken.address, provider)
    }
  }, [ fromToken, provider ])

  useEffect(() => {
    if (contract && address && fromToken) {
      if (fromToken.tags.includes('native')) {
        provider?.getBalance(address)
          .then((data) => setBalance(formatUnits(data, fromToken.decimals)))
      }
      else {
        contract.balanceOf(address)
          .then((data) => setBalance(formatUnits(data, fromToken.decimals)))
      }

      return () => {
        setBalance('0')
      }
    }
  }, [ fromToken, contract, address, provider ])

  const isSufficient = Number(balance) >= Number(values.sell.replace(/\s/g, ''))

  return {
    balance,
    isSufficient,
  }
}


export default useBalance
