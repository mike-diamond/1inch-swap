import React, { useMemo } from 'react'
import cx from 'classnames'

import { useWeb3Connect } from 'modules'

import Button from 'components/Button/Button'
import { swapContext } from 'components/Swap/util'

import Menu from './Menu/Menu'
import Form from './Form/Form'

import s from './Swap.module.scss'


type SwapProps = {
  className?: string
}

const Swap: React.FC<SwapProps> = (props) => {
  const { className } = props

  const context = swapContext.useInit()
  const { address, connect, isConnecting } = useWeb3Connect()

  const buttonTitle = useMemo(() => {
    if (isConnecting) {
      return 'Connecting...'
    }

    return address ? 'Swap' : 'Connect Wallet'
  }, [ address, isConnecting ])

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
              onClick={() => {
                if (address) {
                  // TODO add allowance and swap
                  console.log(address)
                }
                else {
                  connect()
                }
              }}
            />
          </div>
        </swapContext.Provider>
      </div>
    </div>
  )
}


export default Swap
