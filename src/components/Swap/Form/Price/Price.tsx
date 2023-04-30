import React, { useMemo, useRef } from 'react'
import Image from 'next/image'
import cx from 'classnames'

import Icon from 'components/Icon/Icon'
import Text from 'components/Text/Text'
import ButtonBase from 'components/ButtonBase/ButtonBase'
import { swapContext } from 'components/Swap/util'

import gasImage from './images/gas.png'


type PriceProps = {
  className?: string
}

const Price: React.FC<PriceProps> = (props) => {
  const { className } = props

  const { rate, initialRate, fromToken, toToken, estimatedGas } = swapContext.useData()

  const rateValue = rate || initialRate
  const lastRateRef = useRef(rateValue)
  lastRateRef.current = rate || lastRateRef.current || initialRate

  const rateText = useMemo(() => {
    if (fromToken && toToken && lastRateRef.current) {
      // TODO add fiat value
      const rateString = lastRateRef.current.toFixed(4).replace(/(\.0)?0$/, '')

      return `1 ${toToken.symbol} = ${rateString} ${fromToken.symbol} <span class='color-navy'>($0)</span>`
    }

    return ''
  }, [ rateValue, fromToken, toToken ])

  return (
    <div
      className={cx(className, 'flex items-center bg-onyx px-16 py-12 radius-12')}
    >
      <Icon
        name="info"
        size={14}
        color="bluebell"
      />
      <div className="ml-12 flex flex-1">
        <Text
          message={rateText}
          size="n14"
          color="pearl"
          html
        />
      </div>
      <ButtonBase
        className="flex"
      >
        <Image
          src={gasImage.src}
          width={20}
          height={20}
          alt="Gas"
        />
        <Text
          className="ml-4"
          message={`${estimatedGas} gwei`} // TODO add fiat value
          size="n14"
          color="navy"
        />
        <Icon
          className="ml-12"
          name="arrow"
          size={16}
          color="navy"
        />
      </ButtonBase>
    </div>
  )
}


export default Price
