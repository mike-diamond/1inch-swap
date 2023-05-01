import React, { useCallback, useMemo } from 'react'
import cx from 'classnames'
import { web3 } from 'modules'

import Button from 'components/Button/Button'

import Menu from './Menu/Menu'
import Form from './Form/Form'
import { swapContext, useBalance, useSwapActions } from './util'

import s from './Swap.module.scss'


type SwapProps = {
  className?: string
}

const Swap: React.FC<SwapProps> = ({ className }) => {
  const { address, connect, isConnecting } = web3.useData()
  const { fromToken, values } = swapContext.useData()

  const { isSufficient } = useBalance()
  const { approveAndSwap, isSubmitting } = useSwapActions()

  const handleClick = useCallback(async () => {
    if (address) {
      approveAndSwap()
    }
    else {
      connect()
    }
  }, [ address, connect, approveAndSwap ])

  const buttonTitle = useMemo(() => {
    if (isConnecting) {
      return 'Connecting...'
    }
    if (!address) {
      return 'Connect Wallet'
    }
    if (!isSufficient) {
      return `Insufficient ${fromToken?.symbol} balance`
    }
    if (isSubmitting) {
      return 'Submitting...'
    }

    return 'Swap'
  }, [ address, fromToken, isConnecting, isSufficient, isSubmitting ])

  const isButtonDisabled = Boolean(address) && (
    isSubmitting
    || !isSufficient
    || !Number(values.sell.replace(/\s/g, ''))
  )

  return (
    <div className={cx(s.wrapper, className, 'radius-30 p-2')}>
      <div className={cx(s.container, 'h-full radius-28 py-30 px-24 bg-raven')}>
        <Menu className="px-6" />
        <Form className="mt-20" />
        <div className="mt-24 px-6">
          <Button
            className="w-full"
            title={buttonTitle}
            disabled={isButtonDisabled}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}


export default Swap
