import { useMemo } from 'react'
import { useQuery, web3 } from 'modules'

import { ApiData, Input } from './types'


const useTransaction = ({ amount, tokenAddress, skip }: Input) => {
  const { chain, address } = web3.useData()

  const url = useMemo(() => {
    if (address && tokenAddress && !skip) {
      let query = `tokenAddress=${tokenAddress}`

      if (amount) {
        query += `&amount=${amount}`
      }

      return `/${chain}/approve/transaction?${query}`
    }

    return ''
  }, [ skip, address, tokenAddress ])

  const { data, isFetching } = useQuery<ApiData>(url)

  return {
    transactionData: data,
    isFetching,
  }
}


export default useTransaction
