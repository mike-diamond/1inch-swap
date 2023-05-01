import { useCallback, useState } from 'react'
import { web3 } from 'modules'
import { parseUnits } from '@ethersproject/units'
import { TransactionRequest } from '@ethersproject/providers'
import { useAllowance, useSwap, useTransaction } from 'api'

import * as swapContext from './context'


const useSwapActions = () => {
  const { address, provider } = web3.useData()
  const { form, fromToken, toToken, values } = swapContext.useData()

  const [ isSubmitting, setSubmitting ] = useState(false)

  const { allowance, isFetching: isAllowanceFetching } = useAllowance(fromToken?.address)

  const needApprove = allowance && fromToken
    ? parseUnits(values.sell.replace(/\s/g, '') || '0', fromToken.decimals).gt(allowance)
    : true

  const { transactionData } = useTransaction({
    tokenAddress: fromToken?.address,
    skip: !needApprove,
  })

  const { swapTransactionData, fetchSwap } = useSwap({
    fromToken: fromToken,
    toToken: toToken,
    amount: values.sell,
    skip: isAllowanceFetching || needApprove,
  })

  const handleApprove = useCallback(async () => {
    if (address && provider && transactionData) {
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

          form.fields.buy.set('0')
          form.fields.sell.set('0')

          alert('Successfully swapped')
        }
      }
      catch (error) {
        console.error(error)
      }

      setSubmitting(false)
    }
  }, [ form, address, allowance, needApprove, handleApprove, swapTransactionData ])

  return {
    approveAndSwap: handleApproveAndSwap,
    isSubmitting,
  }
}


export default useSwapActions
