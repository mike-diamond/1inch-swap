import { useMemo } from 'react'
import { useQuery } from 'modules'

import { Input, ApiData } from './types'
import formatInteger from './formatInteger'


const useFiatPrice = ({ value, token }: Input) => {
  const { data, isFetching } = useQuery<ApiData>(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,tether,usd-coin,arbitrum,1inch&vs_currencies=usd',
    'force-cache'
  )

  const rates = useMemo(() => {
    if (data) {
      return {
        ETH: data.ethereum.usd,
        ARB: data.arbitrum.usd,
        USDT: data.tether.usd,
        USDC: data['usd-coin'].usd,
        '1INCH': data['1inch'].usd,
      }
    }
  }, [ data ])

  const rate = rates?.[token as keyof typeof rates]

  return useMemo(() => {
    if (rate) {
      const valueNumber = Number(value.replace(/\s/g, ''))
      const resultNumber = Number(valueNumber) * rate

      const resultString = resultNumber.toFixed(2)
        .replace(/(\.0)?0$/, '')

      return `$${formatInteger(resultString)}`
    }

    return '$0'
  }, [ rate, value ])
}


export default useFiatPrice
