import { useCallback, useMemo } from 'react'
import { parseUnits } from '@ethersproject/units'
import { useQuery, web3 } from 'modules'

import { ApiData, Input } from './types'


const useSwap = ({ amount, fromToken, toToken, skip }: Input) => {
  const { chain, address } = web3.useData()

  const amountWei = useMemo(() => {
    if (fromToken) {
      const amountValue = amount.replace(/\s/g, '') || '0'
      return parseUnits(amountValue, fromToken.decimals)
    }

    return '0'
  }, [ amount ])

  const url = useMemo(() => {
    if (address && Number(amountWei) && fromToken?.address && toToken?.address) {
      const query = `fromTokenAddress=${fromToken?.address}&toTokenAddress=${toToken?.address}&fromAddress=${address}&amount=${amountWei}&slippage=1`

      return `/${chain}/swap?${query}`
    }

    return ''
  }, [ chain, amountWei, fromToken, toToken, address ])

  const { data, isFetching, fetch } = useQuery<ApiData>(url, 'no-cache', skip)

  const fetchSwap = useCallback(() => {
    const { request } = fetch()

    return request
  }, [ fetch ])

  return {
    swapTransactionData: data?.tx,
    isFetching,
    fetchSwap,
  }
}


export default useSwap
