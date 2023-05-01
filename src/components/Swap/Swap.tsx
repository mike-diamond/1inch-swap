import React, { useCallback, useMemo } from 'react'
import cx from 'classnames'

import { web3 } from 'modules'
import { TransactionRequest } from '@ethersproject/providers'
import { useAllowance, useSwap, useTransaction } from 'api'

import Button from 'components/Button/Button'
import { swapContext, useBalance } from 'components/Swap/util'

import Menu from './Menu/Menu'
import Form from './Form/Form'

import s from './Swap.module.scss'


type SwapProps = {
  className?: string
}

const Swap: React.FC<SwapProps> = (props) => {
  const { className } = props

  const context = swapContext.useInit()
  const { balance } = useBalance(context.fromToken)
  const { allowance } = useAllowance(context.fromToken?.address)
  const { address, connect, provider, isConnecting } = web3.useData()
  const { transactionData } = useTransaction({
    tokenAddress: context.fromToken?.address,
    skip: Boolean(allowance),
  })
  const { swapTransactionData, fetchSwap } = useSwap({
    fromToken: context.fromToken,
    toToken: context.toToken,
    amount: context.values.sell,
    allowance,
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

  const token = context.fromToken?.symbol
  const isSufficient = Number(balance) >= Number(context.values.sell.replace(/\s/g, ''))

  const buttonTitle = useMemo(() => {
    if (isConnecting) {
      return 'Connecting...'
    }
    if (!address) {
      return 'Connect Wallet'
    }
    if (!isSufficient) {
      return `Insufficient ${token} balance`
    }

    return 'Swap'
  }, [ address, token, isConnecting, isSufficient ])

  const handleClick = useCallback(async () => {
    if (address) {
      let transactionData = swapTransactionData

      if (!Number(allowance)) {
        await handleApprove()
        const swapData = await fetchSwap()

        transactionData = swapData?.tx
      }

      if (transactionData) {
        await handleSwap(transactionData)
      }
    }
    else {
      connect()
    }
  }, [ address, allowance, connect, handleApprove, swapTransactionData ])

  return (
    <div className={cx(s.wrapper, className, 'radius-30 p-2')}>
      <div className={cx(s.container, 'h-full radius-28 py-30 px-24 bg-raven')}>
        <swapContext.Provider value={context}>
          <Menu
            className="px-6"
          />
          <Form
            className="mt-20"
          />
          <div className="mt-24 px-6">
            <Button
              className="w-full"
              title={buttonTitle}
              disabled={Boolean(address && !isSufficient)}
              onClick={handleClick}
            />
          </div>
        </swapContext.Provider>
      </div>
    </div>
  )
}


export default Swap
