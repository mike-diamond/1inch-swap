import React, { useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import cx from 'classnames'
import { formatUnits } from '@ethersproject/units'
import { useFiatPrice } from 'api'

import Icon from 'components/Icon/Icon'
import Text from 'components/Text/Text'
import ButtonBase from 'components/ButtonBase/ButtonBase'
import { swapContext } from 'views/HomeView/Swap/util'

import gasImage from './images/gas.png'
import formatInteger from '../../../../../api/useFiatPrice/formatInteger'


type PriceProps = {
  className?: string
}

const Price: React.FC<PriceProps> = ({ className }) => {
  const { rate, initialRate, fromToken, toToken, estimatedGas } = swapContext.useData()

  const rateValue = rate || initialRate
  const lastRateRef = useRef(rateValue)

  useEffect(() => {
    lastRateRef.current = 0
  }, [ fromToken, toToken ])

  lastRateRef.current = rate || lastRateRef.current || initialRate

  const fiatValue = useFiatPrice({
    value: String(lastRateRef.current),
    token: fromToken?.symbol,
  })

  const gasFiatValue = useFiatPrice({
    value: formatUnits(estimatedGas.toString(), 'gwei'),
    token: 'ETH',
  })

  const rateText = useMemo(() => {
    if (fromToken && toToken && lastRateRef.current) {
      const rateString = lastRateRef.current.toFixed(4)
        .replace(/(\.0)?0$/, '')

      return `1 ${toToken.symbol} = ${formatInteger(rateString)} ${fromToken.symbol} <span class="color-navy">(${fiatValue})</span>`
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
          message={gasFiatValue}
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
