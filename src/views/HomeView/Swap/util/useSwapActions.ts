import { useCallback, useState } from 'react'
import { web3 } from 'modules'
import { parseUnits } from '@ethersproject/units'
import { TransactionRequest } from '@ethersproject/providers'
import { useAllowance, useSwap, useTransaction } from 'api'

import * as swapContext from './context'


const useSwapActions = () => {
  const { address, provider } = web3.useData()
  const { fromToken, toToken, values } = swapContext.useData()

  const [ isSubmitting, setSubmitting ] = useState(false)

  const { allowance, isFetching: isAllowanceFetching } = useAllowance(fromToken?.address)

  const { transactionData } = useTransaction({
    tokenAddress: fromToken?.address,
    skip: Boolean(allowance),
  })

  const needApprove = allowance && fromToken
    ? parseUnits(values.sell.replace(/\s/g, ''), fromToken.decimals).gt(allowance)
    : true

  const { swapTransactionData, fetchSwap } = useSwap({
    fromToken: fromToken,
    toToken: toToken,
    amount: values.sell,
    skip: isAllowanceFetching || needApprove,
  })

  const handleApprove = useCallback(async () => {
    if (provider && transactionData) {
      const signer = provider.getUncheckedSigner(address)
      const transaction = await signer.sendTransaction(transactionData)
      await transaction.wait()
    }
  }, [ address, provider, transactionData ])

  const handleSwap = useCallback(async (swapTransactionData: TransactionRequest) => {
    if (provider && swapTransactionData) {
      const signer = provider.getUncheckedSigner(address)
      const transaction = await signer.sendTransaction(swapTransactionData)
      await transaction.wait()
    }
  }, [ address, provider ])

  const handleApproveAndSwap = useCallback(async () => {
    if (address) {
      setSubmitting(true)

      try {
        let transactionData = swapTransactionData

        if (needApprove) {
          await handleApprove()
          const swapData = await fetchSwap()

          transactionData = swapData?.tx
        }

        if (transactionData) {
          const { gas, ...txData } = transactionData

          await handleSwap(txData)
        }
      }
      catch (error) {
        console.error(error)
      }

      setSubmitting(false)
    }
  }, [ address, allowance, handleApprove, swapTransactionData ])

  return {
    approveAndSwap: handleApproveAndSwap,
    isSubmitting,
  }
}


export default useSwapActions
