import { useEffect, useMemo, useState } from 'react'
import { erc20, web3 } from 'modules'
import { formatUnits } from '@ethersproject/units'
import { Web3Provider } from '@ethersproject/providers'

import { TokenApiData } from '../../../api/useQuote/types'


const useBalance = (token: TokenApiData) => {
  const { address, provider } = web3.useData()

  const [ balance, setBalance ] = useState<string>('0')

  const contract = useMemo(() => {
    if (provider && token?.address) {
      return erc20(token.address, provider)
    }
  }, [ token, provider ])

  useEffect(() => {
    if (contract && address) {
      if (token.tags.includes('native')) {
        provider?.getBalance(address)
          .then((data) => setBalance(formatUnits(data, token.decimals)))
      }
      else {
        contract.balanceOf(address)
          .then((data) => setBalance(formatUnits(data, token.decimals)))
      }

      return () => {
        setBalance('0')
      }
    }
  }, [ token, contract, address, provider ])

  return {
    balance,
  }
}


export default useBalance
