import { useMemo } from 'react'
import { useQuery, useWeb3Connect } from 'modules'
import { formatUnits, parseUnits } from '@ethersproject/units'

import { ApiData, Input } from './types'


const useQuote = ({ fromToken, toToken, amount, cache }: Input) => {
  const { chain } = useWeb3Connect()
  const amountValue = useMemo(() => amount.replace(/\s/g, ''), [ amount ])

  const url = useMemo(() => {
    if (fromToken && toToken && Number(amountValue)) {
      const amountWei = parseUnits(amountValue, fromToken.decimals)
      const query = `fromTokenAddress=${fromToken.address}&toTokenAddress=${toToken.address}&amount=${amountWei}`

      return `/${chain}/quote?${query}`
    }

    return ''
  }, [ chain, fromToken, toToken, amountValue ])

  const { data, isFetching } = useQuery<ApiData>(url, cache || 'no-cache')

  const toAmount = useMemo(() => {
    if (data && toToken) {
      return formatUnits(data.toTokenAmount, toToken.decimals)
    }

    return '0'
  }, [ data, toToken ])

  const rate = useMemo(() => {
    if (toAmount && amountValue) {
      const toNumber = Number(toAmount)
      const fromNumber = Number(amountValue)

      if (fromNumber && toNumber) {
        return (fromNumber / toNumber).toFixed(2).replace(/(\.0)?0$/, '')
      }
    }

    return ''
  }, [ toAmount, amountValue ])

  const estimatedGas = useMemo(() => {
    if (data?.estimatedGas) {
      return data.estimatedGas
    }

    return '0'
  }, [ data ])

  return {
    rate,
    toAmount,
    estimatedGas,
    isFetching,
  }
}


export default useQuote
