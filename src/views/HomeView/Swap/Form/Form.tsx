import React from 'react'
import { useFiatPrice } from 'api'

import Input from 'components/Input/Input'
import { swapContext } from 'views/HomeView/Swap/util'

import Price from './Price/Price'
import FastBuy from './FastBuy/FastBuy'
import TokenSelect from './TokenSelect/TokenSelect'
import ExchangeButton from './ExchangeButton/ExchangeButton'


type FormProps = {
  className?: string
  balance?: string
}

const Form: React.FC<FormProps> = (props) => {
  const { className, balance } = props

  const { form, values, fromToken, toToken, sellOptions, buyOptions } = swapContext.useData()

  const buyLabel = useFiatPrice({
    value: values.buy,
    token: toToken?.symbol,
  })

  const sellLabel = useFiatPrice({
    value: values.sell,
    token: fromToken?.symbol,
  })

  return (
    <div className={className}>
      <Input
        className="mt-4"
        field={form.fields.sell}
        label={sellLabel ? `~${sellLabel}` : ''}
        mask="amount"
        rightNode={(
          <TokenSelect
            className="ml-16"
            label="You sell"
            token={fromToken?.symbol}
            image={fromToken?.logoURI}
            options={sellOptions}
            max={balance}
            onChange={(value) => form.fields.sellToken.set(value)}
            onMaxButtonClick={() => form.fields.sell.set(balance)}
          />
        )}
      />
      <div className="relative mt-4 flex justify-center">
        <ExchangeButton
          className="z-1"
          onClick={() => {
            const { buy, sell, buyToken, sellToken } = form.getValues()

            form.setValues({
              buy: sell,
              sell: buy,
              buyToken: sellToken,
              sellToken: buyToken,
            })
          }}
        />
        <div className="absolute w-full h-px bg-onyx left-0 top-50" />
      </div>
      <Input
        field={form.fields.buy}
        label={buyLabel ? `~${buyLabel}` : ''}
        mask="amount"
        disabled
        rightNode={(
          <TokenSelect
            className="ml-16"
            label="You buy"
            token={toToken?.symbol}
            image={toToken?.logoURI}
            options={buyOptions}
            onChange={(value) => form.fields.buyToken.set(value)}
          />
        )}
      />
      <FastBuy
        className="mt-20 mx-6"
        field={form.fields.fastBuy}
      />
      <Price
        className="mt-20"
      />
    </div>
  )
}


export default Form
