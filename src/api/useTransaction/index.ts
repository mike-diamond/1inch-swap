import { useMemo } from 'react'
import { useQuery, web3 } from 'modules'

import { ApiData, Input } from './types'


const useTransaction = ({ amount, tokenAddress, skip }: Input) => {
  const { chain, address } = web3.useData()

  const url = useMemo(() => {
    if (address && tokenAddress) {
      let query = `tokenAddress=${tokenAddress}`

      if (amount) {
        query += `&amount=${amount}`
      }

      return `/${chain}/approve/transaction?${query}`
    }

    return ''
  }, [ address, tokenAddress ])

  const { data, isFetching } = useQuery<ApiData>(url, 'no-cache', skip)

  return {
    transactionData: data,
    isFetching,
  }
}


export default useTransaction
