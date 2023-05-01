import { useMemo } from 'react'
import { useQuery, web3 } from 'modules'

import { ApiData } from './types'


const useAllowance = (fromTokenAddress?: string) => {
  const { chain, address } = web3.useData()

  const url = useMemo(() => {
    if (address && fromTokenAddress) {
      const query = `walletAddress=${address}&tokenAddress=${fromTokenAddress}`

      return `/${chain}/approve/allowance?${query}`
    }

    return ''
  }, [ address, fromTokenAddress ])

  const { data, isFetching } = useQuery<ApiData>(url)

  return {
    allowance: data?.allowance || '',
    isFetching,
  }
}


export default useAllowance
