import { useMemo } from 'react'
import { useQuery, useWeb3Connect } from 'modules'

import { ApiData } from './types'


const allowedTokens = [
  'ETH',
  'ARB',
  'USDT',
  'USDC',
  '1INCH',
]

const useTokens = () => {
  const { chain } = useWeb3Connect()
  const { data, isFetching } = useQuery<ApiData>(`/${chain}/tokens`, 'force-cache')

  const tokens = useMemo(() => {
    const result: ApiData['tokens'] = {}

    if (data?.tokens) {
      Object.keys(data.tokens).forEach((tokenAddress) => {
        const tokenData = data.tokens[tokenAddress]

        if (allowedTokens.includes(tokenData.symbol)) {
          result[tokenData.symbol] = tokenData
        }
      })
    }

    return result
  }, [ data ])

  return {
    tokens,
    isFetching,
  }
}


export default useTokens
